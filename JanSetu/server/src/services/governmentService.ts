import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { Problem, ProblemStatus } from '../types/index.js';

export class GovernmentService {
  public static async getGovernmentProblems(district?: string, status?: string): Promise<Problem[]> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const filters: any = {};
    if (district) filters.district = district;
    if (status) filters.status = status;
    return problemRepo.findAll(filters);
  }

  public static async verifyProblem(
    problemId: string,
    officerName: string,
    notes?: string,
    prioritySeverity?: any
  ): Promise<Problem | null> {
    const problemRepo = repositoryFactory.getProblemRepository();

    const problem = await problemRepo.findById(problemId);
    if (!problem) return null;

    if (prioritySeverity) {
      await problemRepo.update(problem.id, { severity: prioritySeverity });
    }

    return problemRepo.updateStatus(
      problem.id,
      'GOVERNMENT_REVIEW',
      notes || `Verified by local authority officer ${officerName}. Priority validated.`,
      officerName,
      'GOVERNMENT'
    );
  }

  public static async updateStatus(
    problemId: string,
    status: ProblemStatus,
    officerName: string,
    notes?: string
  ): Promise<Problem | null> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const problem = await problemRepo.findById(problemId);
    if (!problem) return null;

    return problemRepo.updateStatus(
      problem.id,
      status,
      notes || `Government authority updated status to ${status}.`,
      officerName,
      'GOVERNMENT'
    );
  }
}
