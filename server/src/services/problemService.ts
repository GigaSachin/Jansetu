import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { Problem, ProblemAttachment, ProblemStatusHistory, ProblemStatus, SeverityLevel, UrgencyLevel, ImpactLevel } from '../types/index.js';
import { generateIssueId } from '../utils/issueIdGenerator.js';
import { AiEngineService } from './aiEngineService.js';

export interface CreateProblemDTO {
  citizen_id?: string;
  title: string;
  description: string;
  category: string;
  district: string;
  block?: string;
  locality?: string;
  village_town?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  severity?: SeverityLevel;
  urgency?: UrgencyLevel;
  impact_level?: ImpactLevel;
  estimated_affected_population?: string;
  evidence?: Array<{
    name: string;
    size: number;
    type: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | string;
    url: string;
  }>;
}

export class ProblemService {
  public static async createProblem(dto: CreateProblemDTO, citizenUser?: { id: string; name: string }): Promise<{
    problem: Problem;
    issue_id: string;
    message: string;
  }> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const notifRepo = repositoryFactory.getNotificationRepository();

    const now = new Date().toISOString();
    const issue_id = generateIssueId();
    const problemId = `prob-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const citizenId = citizenUser?.id || dto.citizen_id || 'usr-citizen-demo';

    const newProblem: Problem = {
      id: problemId,
      issue_id,
      citizen_id: citizenId,
      title: dto.title.trim(),
      description: dto.description.trim(),
      category: dto.category || 'Water & Sanitation',
      district: dto.district || 'Ramgarh',
      block: dto.block,
      locality: dto.locality,
      village_town: dto.village_town,
      state: dto.state || 'Jharkhand',
      latitude: dto.latitude || 23.6334,
      longitude: dto.longitude || 85.5186,
      severity: dto.severity || 'MEDIUM',
      urgency: dto.urgency || 'MEDIUM',
      impact_level: dto.impact_level || 'MEDIUM',
      estimated_affected_population: dto.estimated_affected_population,
      status: 'REPORTED',
      created_at: now,
      updated_at: now
    };

    // 1. Save problem
    const saved = await problemRepo.create(newProblem);

    // 2. Initial status history record
    const historyItem: ProblemStatusHistory = {
      id: `hist-${Date.now()}-1`,
      problem_id: saved.id,
      status: 'REPORTED',
      notes: 'Citizen problem recorded on JanSetu network.',
      changed_by: citizenUser?.name || 'Citizen Reporter',
      changed_by_role: 'CITIZEN',
      created_at: now
    };
    await problemRepo.addStatusHistory(historyItem);

    // 3. Save attachments if provided
    if (dto.evidence && dto.evidence.length > 0) {
      for (const ev of dto.evidence) {
        const fileType = (ev.type.toUpperCase().includes('IMAGE') ? 'IMAGE' :
                          ev.type.toUpperCase().includes('VIDEO') ? 'VIDEO' : 'DOCUMENT') as any;
        const attachment: ProblemAttachment = {
          id: `att-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          problem_id: saved.id,
          file_name: ev.name,
          file_type: fileType,
          file_size: ev.size || 1024,
          file_url: ev.url,
          created_at: now
        };
        await problemRepo.addAttachment(attachment);
      }
    }

    // 4. Create Notification
    await notifRepo.create({
      id: `notif-${Date.now()}`,
      user_id: citizenId,
      title: 'Problem Registered Successfully',
      message: `Your issue #${issue_id} has been registered and submitted for AI triage.`,
      type: 'STATUS_UPDATE',
      is_read: false,
      issue_id,
      target_url: `/citizen/issues/${issue_id}`,
      created_at: now
    });

    // 5. Asynchronously trigger AI Engine processing
    const triageText = `${dto.title}. ${dto.description}. Location: ${dto.locality || ''} ${dto.district || ''} Jharkhand.`;
    AiEngineService.processProblemTriage(
      saved.id,
      triageText,
      saved.district,
      saved.latitude,
      saved.longitude
    ).catch((err) => {
      console.warn('AI Triage async warning:', err.message);
    });

    return {
      problem: saved,
      issue_id: saved.issue_id,
      message: 'Problem submitted successfully. AI analysis is initiated.'
    };
  }

  public static async getProblems(filters?: any): Promise<Problem[]> {
    const problemRepo = repositoryFactory.getProblemRepository();
    return problemRepo.findAll(filters);
  }

  public static async getProblemById(idOrIssueId: string): Promise<Problem | null> {
    const problemRepo = repositoryFactory.getProblemRepository();
    return problemRepo.findById(idOrIssueId);
  }

  public static async updateProblem(id: string, updates: Partial<Problem>): Promise<Problem | null> {
    const problemRepo = repositoryFactory.getProblemRepository();
    return problemRepo.update(id, updates);
  }

  public static async updateProblemStatus(
    id: string,
    status: ProblemStatus,
    notes?: string,
    changedBy = 'Authority Officer',
    changedByRole = 'GOVERNMENT'
  ): Promise<Problem | null> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const notifRepo = repositoryFactory.getNotificationRepository();

    const updated = await problemRepo.updateStatus(id, status, notes, changedBy, changedByRole);
    if (updated) {
      // Notify citizen
      await notifRepo.create({
        id: `notif-${Date.now()}`,
        user_id: updated.citizen_id,
        title: `Problem Status Update: ${status}`,
        message: notes || `The status for "${updated.title}" is now ${status}.`,
        type: 'STATUS_UPDATE',
        is_read: false,
        issue_id: updated.issue_id,
        target_url: `/citizen/issues/${updated.issue_id}`,
        created_at: new Date().toISOString()
      });
    }
    return updated;
  }

  public static async getProblemJourney(idOrIssueId: string): Promise<{
    problem: Problem;
    statusHistory: ProblemStatusHistory[];
    attachments: ProblemAttachment[];
    aiAnalysis: any | null;
    matches: any[];
    similarProblems: any[];
  } | null> {
    const problem = await this.getProblemById(idOrIssueId);
    if (!problem) return null;

    const problemRepo = repositoryFactory.getProblemRepository();
    const aiAnalysisRepo = repositoryFactory.getAiAnalysisRepository();

    const [statusHistory, attachments, aiAnalysis, matches, similarProblems] = await Promise.all([
      problemRepo.getStatusHistory(problem.id),
      problemRepo.getAttachments(problem.id),
      aiAnalysisRepo.getAnalysisByProblemId(problem.id),
      aiAnalysisRepo.getMatchesByProblemId(problem.id),
      aiAnalysisRepo.getSimilarProblemsByProblemId(problem.id)
    ]);

    return {
      problem,
      statusHistory,
      attachments,
      aiAnalysis,
      matches,
      similarProblems
    };
  }

  public static async getProblemAiAnalysis(idOrIssueId: string): Promise<any | null> {
    const problem = await this.getProblemById(idOrIssueId);
    if (!problem) return null;

    const aiAnalysisRepo = repositoryFactory.getAiAnalysisRepository();
    const analysis = await aiAnalysisRepo.getAnalysisByProblemId(problem.id);
    const matches = await aiAnalysisRepo.getMatchesByProblemId(problem.id);
    const similar = await aiAnalysisRepo.getSimilarProblemsByProblemId(problem.id);

    return {
      problemId: problem.issue_id,
      status: analysis ? 'COMPLETED' : (problem.status === 'AI_ANALYZING' ? 'ANALYSING' : 'PENDING'),
      analysis,
      institutionMatches: matches,
      similarProblems: similar
    };
  }

  public static async getProblemMatches(idOrIssueId: string): Promise<any[]> {
    const problem = await this.getProblemById(idOrIssueId);
    if (!problem) return [];

    const aiAnalysisRepo = repositoryFactory.getAiAnalysisRepository();
    return aiAnalysisRepo.getMatchesByProblemId(problem.id);
  }

  public static async addAttachment(idOrIssueId: string, fileData: {
    fileName: string;
    fileType: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    fileSize: number;
    fileUrl: string;
  }): Promise<ProblemAttachment | null> {
    const problem = await this.getProblemById(idOrIssueId);
    if (!problem) return null;

    const problemRepo = repositoryFactory.getProblemRepository();
    const attachment: ProblemAttachment = {
      id: `att-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      problem_id: problem.id,
      file_name: fileData.fileName,
      file_type: fileData.fileType,
      file_size: fileData.fileSize,
      file_url: fileData.fileUrl,
      created_at: new Date().toISOString()
    };
    return problemRepo.addAttachment(attachment);
  }
}
