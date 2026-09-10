import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { Problem } from '../types/index.js';

export class UniversityService {
  public static async getChallenges(domain?: string, district?: string): Promise<Problem[]> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const filters: any = {};
    if (domain) filters.category = domain;
    if (district) filters.district = district;
    return problemRepo.findAll(filters);
  }

  public static async getMatchesForInstitution(institutionId: string): Promise<any[]> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const aiRepo = repositoryFactory.getAiAnalysisRepository();

    const allProblems = await problemRepo.findAll();
    const matchedProblems: any[] = [];

    for (const p of allProblems) {
      const matches = await aiRepo.getMatchesByProblemId(p.id);
      const matchedWithThisInst = matches.find(
        (m) => m.institution_id === institutionId || m.institution_name?.toLowerCase().includes(institutionId.toLowerCase())
      );

      if (matchedWithThisInst) {
        matchedProblems.push({
          problem: p,
          match: matchedWithThisInst
        });
      }
    }

    return matchedProblems;
  }

  public static async expressInterest(
    problemId: string,
    institutionName: string,
    teamLead: string,
    proposalNotes?: string
  ): Promise<any> {
    const problemRepo = repositoryFactory.getProblemRepository();
    const problem = await problemRepo.findById(problemId);
    if (!problem) return null;

    // Update status to SOLUTION_DEVELOPMENT
    await problemRepo.updateStatus(
      problem.id,
      'SOLUTION_DEVELOPMENT',
      `University capstone team from ${institutionName} led by ${teamLead} initiated project design. Proposal: ${proposalNotes || 'Academic capstone prototype'}`,
      teamLead,
      'UNIVERSITY'
    );

    return {
      problemId: problem.issue_id,
      status: 'INTEREST_REGISTERED',
      institution: institutionName,
      lead: teamLead,
      notes: proposalNotes
    };
  }
}
