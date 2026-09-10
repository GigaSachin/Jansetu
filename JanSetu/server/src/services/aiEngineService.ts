import { config } from '../config/env.js';
import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { AiAnalysis, InstitutionMatch, SimilarProblem, ProblemStatus } from '../types/index.js';

interface TriageApiRequest {
  problemId: string;
  text: string;
  district?: string;
  latitude?: number;
  longitude?: number;
}

interface TriageApiResponse {
  problemId: string;
  status: 'QUEUED' | 'ANALYSING' | 'MATCHING' | 'COMPLETED' | 'FAILED';
  category?: string;
  confidence?: number;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  urgency?: 'LOW' | 'MEDIUM' | 'HIGH';
  impactLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedAffectedPop?: string;
  similarProblems?: Array<{
    problemId: string;
    title: string;
    similarity: number;
    relationship: string;
    blueprintUrl?: string;
  }>;
  institutionMatches?: Array<{
    id: string;
    name: string;
    matchScore: number;
    reasons: string[];
  }>;
  recommendedAction?: string;
}

export class AiEngineService {
  /**
   * Triggers the AI Engine triage asynchronously for a newly created problem.
   * If FastAPI is online: polls and stores the completed analysis.
   * If FastAPI is offline: logs gracefully without failing problem creation, sets AI status to PENDING.
   */
  public static async processProblemTriage(
    problemId: string,
    text: string,
    district: string,
    latitude?: number,
    longitude?: number
  ): Promise<void> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const aiAnalysisRepo = repositoryFactory.getAiAnalysisRepository();

    console.log(`🤖 [AI Engine]: Initiating triage for problem ${problemId}...`);

    try {
      // 1. Mark problem as AI_ANALYZING
      await problemRepo.updateStatus(
        problemId,
        'AI_ANALYZING',
        'Problem queued for automated triage and HEI matching.',
        'JanSetu AI Engine',
        'AI_SYSTEM'
      );

      // 2. Call FastAPI POST /triage
      const payload: TriageApiRequest = {
        problemId,
        text,
        district,
        latitude: latitude || 23.6334,
        longitude: longitude || 85.5186
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${config.aiEngineUrl}/triage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`AI Engine /triage returned HTTP ${response.status}`);
      }

      // 3. Poll for AI completion (up to 10 attempts over 4 seconds)
      let finalResult: TriageApiResponse | null = null;

      for (let attempt = 0; attempt < 10; attempt++) {
        await new Promise((r) => setTimeout(r, 400));

        const pollRes = await fetch(`${config.aiEngineUrl}/triage/${encodeURIComponent(problemId)}`);
        if (pollRes.ok) {
          const pollData = (await pollRes.json()) as TriageApiResponse;
          if (pollData.status === 'COMPLETED' || pollData.status === 'FAILED') {
            finalResult = pollData;
            break;
          }
        }
      }

      if (finalResult && finalResult.status === 'COMPLETED') {
        const now = new Date().toISOString();

        // Save AI Analysis
        const analysis: AiAnalysis = {
          id: `ai-${Date.now()}`,
          problem_id: problemId,
          category: finalResult.category || 'Water & Sanitation',
          confidence: finalResult.confidence || 0.92,
          severity: finalResult.severity || 'MEDIUM',
          urgency: finalResult.urgency || 'MEDIUM',
          impact_level: finalResult.impactLevel || 'MEDIUM',
          estimated_affected_population: finalResult.estimatedAffectedPop || 'Community Residents',
          recommended_action: finalResult.recommendedAction || 'ROUTE_TO_INSTITUTION',
          engine_source: 'LIVE_FASTAPI_ENGINE',
          created_at: now
        };
        await aiAnalysisRepo.saveAnalysis(analysis);

        // Save Institution Matches
        if (finalResult.institutionMatches && finalResult.institutionMatches.length > 0) {
          const matches: InstitutionMatch[] = finalResult.institutionMatches.map((im) => ({
            id: `match-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            problem_id: problemId,
            institution_id: im.id,
            institution_name: im.name,
            match_score: im.matchScore,
            reasons: im.reasons,
            created_at: now
          }));
          await aiAnalysisRepo.saveMatches(matches);
        }

        // Save Similar Problems
        if (finalResult.similarProblems && finalResult.similarProblems.length > 0) {
          const similarProbs: SimilarProblem[] = finalResult.similarProblems.map((sp) => ({
            id: `sim-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            problem_id: problemId,
            similar_problem_id: sp.problemId,
            similarity: sp.similarity,
            relationship: sp.relationship,
            blueprint_url: sp.blueprintUrl,
            created_at: now
          }));
          await aiAnalysisRepo.saveSimilarProblems(similarProbs);
        }

        // Update Problem Status to AI_ANALYZED
        await problemRepo.updateStatus(
          problemId,
          'AI_ANALYZED',
          `AI Analysis completed with confidence ${(analysis.confidence * 100).toFixed(0)}%. Category: ${analysis.category}.`,
          'JanSetu AI Engine',
          'AI_SYSTEM'
        );

        console.log(`✅ [AI Engine]: Successfully processed and saved analysis for ${problemId}`);
      } else {
        throw new Error('AI analysis did not complete within timeout');
      }
    } catch (error: any) {
      console.warn(`⚠️ [AI Engine Offline / Pending]: Problem ${problemId} saved successfully. AI status is pending. (${error.message})`);
      // Update status to REPORTED or keep as REPORTED with a note
      await problemRepo.updateStatus(
        problemId,
        'REPORTED',
        'Problem reported successfully. AI analysis is pending.',
        'System Fallback',
        'SYSTEM'
      );
    }
  }

  /**
   * Health check for FastAPI AI Engine
   */
  public static async checkHealth(): Promise<{ isOnline: boolean; details?: any }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const res = await fetch(`${config.aiEngineUrl}/health`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return { isOnline: true, details: data };
      }
    } catch {
      // offline
    }
    return { isOnline: false };
  }
}
