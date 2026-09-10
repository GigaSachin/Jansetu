import { ApiClient } from './apiClient';
import { mapBackendProblemToIssue } from './problemService';
import { Issue } from '../types';

export interface ProblemJourneyData {
  issue: Issue;
  statusHistory: any[];
  attachments: any[];
  aiAnalysis: any;
  matches: any[];
  similarProblems: any[];
}

export const journeyService = {
  async getJourney(idOrIssueId: string): Promise<ProblemJourneyData | null> {
    const res = await ApiClient.get<any>(`/problems/${idOrIssueId}/journey`);
    if (res.success && res.data) {
      const { problem, statusHistory, attachments, aiAnalysis, matches, similarProblems } = res.data;
      const issue = mapBackendProblemToIssue(problem, statusHistory, aiAnalysis);
      return {
        issue,
        statusHistory,
        attachments,
        aiAnalysis,
        matches,
        similarProblems
      };
    }
    return null;
  }
};
