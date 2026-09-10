import { IProblemRepository, ProblemFilterOptions } from '../interfaces/IProblemRepository.js';
import { Problem, ProblemAttachment, ProblemStatusHistory, ProblemStatus } from '../../types/index.js';
import { getInitialProblems } from '../../database/seedData.js';

export class MockProblemRepository implements IProblemRepository {
  private problems: Map<string, Problem> = new Map();
  private attachments: Map<string, ProblemAttachment[]> = new Map();
  private statusHistory: Map<string, ProblemStatusHistory[]> = new Map();

  constructor() {
    const seed = getInitialProblems();
    for (const p of seed) {
      this.problems.set(p.id, p);

      // Initial status history for seeds
      const initialHistory: ProblemStatusHistory = {
        id: `hist-seed-${p.id}`,
        problem_id: p.id,
        status: p.status,
        notes: `Problem recorded on JanSetu network.`,
        changed_by: 'System Initializer',
        changed_by_role: 'SYSTEM',
        created_at: p.created_at
      };
      this.statusHistory.set(p.id, [initialHistory]);
    }
  }

  async create(problem: Problem): Promise<Problem> {
    this.problems.set(problem.id, problem);
    return problem;
  }

  async findById(id: string): Promise<Problem | null> {
    // Search by ID or Issue ID
    const direct = this.problems.get(id);
    if (direct) return direct;
    return this.findByIssueId(id);
  }

  async findByIssueId(issueId: string): Promise<Problem | null> {
    const norm = issueId.toLowerCase().trim();
    for (const p of this.problems.values()) {
      if (p.issue_id.toLowerCase().trim() === norm || p.id.toLowerCase().trim() === norm) {
        return p;
      }
    }
    return null;
  }

  async findAll(filters?: ProblemFilterOptions): Promise<Problem[]> {
    let result = Array.from(this.problems.values());

    if (filters) {
      if (filters.district) {
        result = result.filter(p => p.district.toLowerCase() === filters.district!.toLowerCase());
      }
      if (filters.category) {
        result = result.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
      }
      if (filters.status) {
        result = result.filter(p => p.status.toLowerCase() === filters.status!.toLowerCase());
      }
      if (filters.severity) {
        result = result.filter(p => p.severity.toLowerCase() === filters.severity!.toLowerCase());
      }
      if (filters.citizen_id) {
        result = result.filter(p => p.citizen_id === filters.citizen_id);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.issue_id.toLowerCase().includes(query) ||
          p.district.toLowerCase().includes(query)
        );
      }
    }

    // Sort descending by created_at
    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (filters?.offset !== undefined && filters?.limit !== undefined) {
      result = result.slice(filters.offset, filters.offset + filters.limit);
    } else if (filters?.limit !== undefined) {
      result = result.slice(0, filters.limit);
    }

    return result;
  }

  async update(id: string, updates: Partial<Problem>): Promise<Problem | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated: Problem = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.problems.set(existing.id, updated);
    return updated;
  }

  async updateStatus(
    id: string,
    status: ProblemStatus,
    notes?: string,
    changedBy = 'System',
    changedByRole = 'SYSTEM'
  ): Promise<Problem | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updated: Problem = {
      ...existing,
      status,
      updated_at: now
    };
    this.problems.set(existing.id, updated);

    // Append history record
    const historyItem: ProblemStatusHistory = {
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      problem_id: existing.id,
      status,
      notes: notes || `Status changed to ${status}`,
      changed_by: changedBy,
      changed_by_role: changedByRole,
      created_at: now
    };
    await this.addStatusHistory(historyItem);

    return updated;
  }

  async addAttachment(attachment: ProblemAttachment): Promise<ProblemAttachment> {
    const list = this.attachments.get(attachment.problem_id) || [];
    list.push(attachment);
    this.attachments.set(attachment.problem_id, list);
    return attachment;
  }

  async getAttachments(problemId: string): Promise<ProblemAttachment[]> {
    return this.attachments.get(problemId) || [];
  }

  async addStatusHistory(history: ProblemStatusHistory): Promise<ProblemStatusHistory> {
    const list = this.statusHistory.get(history.problem_id) || [];
    list.push(history);
    this.statusHistory.set(history.problem_id, list);
    return history;
  }

  async getStatusHistory(problemId: string): Promise<ProblemStatusHistory[]> {
    const list = this.statusHistory.get(problemId) || [];
    return [...list].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
}
