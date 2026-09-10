import { Problem, ProblemAttachment, ProblemStatusHistory, ProblemStatus } from '../../types/index.js';

export interface ProblemFilterOptions {
  district?: string;
  category?: string;
  status?: string;
  severity?: string;
  citizen_id?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface IProblemRepository {
  create(problem: Problem): Promise<Problem>;
  findById(id: string): Promise<Problem | null>;
  findByIssueId(issueId: string): Promise<Problem | null>;
  findAll(filters?: ProblemFilterOptions): Promise<Problem[]>;
  update(id: string, updates: Partial<Problem>): Promise<Problem | null>;
  updateStatus(id: string, status: ProblemStatus, notes?: string, changedBy?: string, changedByRole?: string): Promise<Problem | null>;
  
  // Attachments
  addAttachment(attachment: ProblemAttachment): Promise<ProblemAttachment>;
  getAttachments(problemId: string): Promise<ProblemAttachment[]>;

  // Status History
  addStatusHistory(history: ProblemStatusHistory): Promise<ProblemStatusHistory>;
  getStatusHistory(problemId: string): Promise<ProblemStatusHistory[]>;
}
