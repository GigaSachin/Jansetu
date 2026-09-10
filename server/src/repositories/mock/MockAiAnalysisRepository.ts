import { IAiAnalysisRepository } from '../interfaces/IAiAnalysisRepository.js';
import { AiAnalysis, InstitutionMatch, SimilarProblem } from '../../types/index.js';

export class MockAiAnalysisRepository implements IAiAnalysisRepository {
  private analyses: Map<string, AiAnalysis> = new Map();
  private matches: Map<string, InstitutionMatch[]> = new Map();
  private similarProblems: Map<string, SimilarProblem[]> = new Map();

  constructor() {
    // Initial analysis for seed problems
    const seed1Analysis: AiAnalysis = {
      id: 'ai-seed-001',
      problem_id: 'prob-seed-001',
      category: 'Water & Sanitation',
      confidence: 0.94,
      severity: 'HIGH',
      urgency: 'HIGH',
      impact_level: 'HIGH',
      estimated_affected_population: '1,200 - 2,500 Citizens in Ramgarh',
      recommended_action: 'ROUTE_TO_INSTITUTION',
      engine_source: 'LIVE_FASTAPI_ENGINE',
      created_at: new Date('2026-01-02').toISOString()
    };
    this.analyses.set('prob-seed-001', seed1Analysis);

    this.matches.set('prob-seed-001', [
      {
        id: 'match-001-1',
        problem_id: 'prob-seed-001',
        institution_id: 'inst-bit-mesra',
        institution_name: 'Birla Institute of Technology (BIT) Mesra',
        match_score: 0.96,
        reasons: ['Specialized Water & Sanitation Faculty & Labs', 'Civil & Environmental Systems', 'Direct Proximity'],
        created_at: new Date('2026-01-02').toISOString()
      },
      {
        id: 'match-001-2',
        problem_id: 'prob-seed-001',
        institution_id: 'inst-iit-ism-dhanbad',
        institution_name: 'Indian Institute of Technology (ISM) Dhanbad',
        match_score: 0.93,
        reasons: ['Hydro-geology & Permeable Runoff Engineering', 'Jharkhand Capstone Consortium'],
        created_at: new Date('2026-01-02').toISOString()
      }
    ]);

    this.similarProblems.set('prob-seed-001', [
      {
        id: 'sim-001-1',
        problem_id: 'prob-seed-001',
        similar_problem_id: 'JS-JH-2026-000841',
        similarity: 0.88,
        relationship: 'SIMILAR_PROBLEM',
        blueprint_url: '/solutions',
        created_at: new Date('2026-01-02').toISOString()
      }
    ]);
  }

  async saveAnalysis(analysis: AiAnalysis): Promise<AiAnalysis> {
    this.analyses.set(analysis.problem_id, analysis);
    return analysis;
  }

  async getAnalysisByProblemId(problemId: string): Promise<AiAnalysis | null> {
    return this.analyses.get(problemId) || null;
  }

  async saveMatches(matches: InstitutionMatch[]): Promise<InstitutionMatch[]> {
    if (matches.length === 0) return [];
    const problemId = matches[0].problem_id;
    this.matches.set(problemId, matches);
    return matches;
  }

  async getMatchesByProblemId(problemId: string): Promise<InstitutionMatch[]> {
    return this.matches.get(problemId) || [];
  }

  async saveSimilarProblems(problems: SimilarProblem[]): Promise<SimilarProblem[]> {
    if (problems.length === 0) return [];
    const problemId = problems[0].problem_id;
    this.similarProblems.set(problemId, problems);
    return problems;
  }

  async getSimilarProblemsByProblemId(problemId: string): Promise<SimilarProblem[]> {
    return this.similarProblems.get(problemId) || [];
  }
}
