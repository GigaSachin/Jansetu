import { ApiClient } from './apiClient';

export interface ImpactMetrics {
  problemsReported: number;
  problemsVerified: number;
  aiMatched: number;
  solutionsInDevelopment: number;
  problemsResolved: number;
  citizensImpacted: number;
}

export interface PipelineStageInfo {
  stage: string;
  completed: boolean;
  detail: string;
}

export interface ImpactCaseStudy {
  id: string;
  title: string;
  titleHi?: string;
  district: string;
  state: string;
  locality?: string;
  affectedCitizens: string;
  category: string;
  currentStatus: string;
  statusLabel: string;
  aiMatchedInstitution: string;
  leadInnovator?: string;
  supportingPartner?: string;
  solutionSummary: string;
  isPrototypeCaseStudy: boolean;
  pipelineStages: PipelineStageInfo[];
}

export interface ImpactStatsResponse {
  metrics: ImpactMetrics;
  liveDbCounts: {
    totalReported: number;
    problemsVerified: number;
    aiMatched: number;
    solutionsInDev: number;
    problemsResolved: number;
    dynamicBeneficiaries: number;
  };
  categoryImpact: Record<string, { count: number; resolved: number }>;
  districtImpact: Record<string, { reported: number; inProgress: number; resolved: number }>;
  caseStudies: ImpactCaseStudy[];
  activeRoleFilter: string;
  dataSource: string;
  timestamp: string;
}

export class ImpactService {
  public static async getStats(role?: string): Promise<ImpactStatsResponse | null> {
    try {
      const response = await ApiClient.get<ImpactStatsResponse>('/impact/stats', { role });
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch {
      return null;
    }
  }
}
