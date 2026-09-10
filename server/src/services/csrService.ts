import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { Problem } from '../types/index.js';

export class CsrService {
  public static async getOpportunities(sector?: string, district?: string): Promise<Problem[]> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const filters: any = {};
    if (sector) filters.category = sector;
    if (district) filters.district = district;
    return problemRepo.findAll(filters);
  }

  public static async expressInterest(
    problemId: string,
    companyName: string,
    supportType: 'Funding' | 'Mentorship' | 'Technology' | 'Equipment' | string,
    commitmentAmountOrNote?: string
  ): Promise<any> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const problem = await problemRepo.findById(problemId);
    if (!problem) return null;

    // Update status notes or status history
    await problemRepo.addStatusHistory({
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      problem_id: problem.id,
      status: problem.status,
      notes: `Industry / CSR Partner "${companyName}" pledged ${supportType} support. Details: ${commitmentAmountOrNote || 'Approved under corporate CSR program.'}`,
      changed_by: companyName,
      changed_by_role: 'INDUSTRY_CSR',
      created_at: new Date().toISOString()
    });

    return {
      problemId: problem.issue_id,
      status: 'CSR_SPONSORSHIP_PLEDGED',
      company: companyName,
      supportType,
      commitment: commitmentAmountOrNote
    };
  }
}
