import { ApiClient } from './apiClient';
import { Issue, IssueStatus, Milestone, IssueUpdate, SeverityLevel } from '../types';

export interface CreateProblemPayload {
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
  urgency?: string;
  impact_level?: string;
  estimated_affected_population?: string;
  evidence?: Array<{
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}

export function mapBackendProblemToIssue(backendProblem: any, statusHistory: any[] = [], aiAnalysis: any = null): Issue {
  const status = backendProblem.status as IssueStatus;
  
  const calculateProgress = (st: string): number => {
    switch (st) {
      case 'REPORTED': return 10;
      case 'AI_ANALYZING': return 20;
      case 'AI_ANALYZED': return 35;
      case 'POTENTIAL_MATCH': return 50;
      case 'GOVERNMENT_REVIEW': return 65;
      case 'SOLUTION_DEVELOPMENT': return 85;
      case 'RESOLVED': return 100;
      default: return 15;
    }
  };

  const milestones: Milestone[] = statusHistory.map((h, index) => ({
    id: h.id || `ms-${index}`,
    title: h.status.replace(/_/g, ' '),
    description: h.notes || 'Status updated in journey.',
    status: 'COMPLETED',
    completedAt: h.created_at ? h.created_at.split('T')[0] : undefined,
    assignedTo: h.changed_by
  }));

  if (milestones.length === 0) {
    milestones.push({
      id: 'ms-initial',
      title: 'Problem Reported',
      description: 'Reported on JanSetu portal and queued for AI analysis.',
      status: 'COMPLETED',
      completedAt: backendProblem.created_at ? backendProblem.created_at.split('T')[0] : undefined
    });
  }

  const updates: IssueUpdate[] = statusHistory.map((h) => ({
    id: h.id || `upd-${Date.now()}`,
    timestamp: h.created_at || new Date().toISOString(),
    authorName: h.changed_by || 'System',
    authorRole: (h.changed_by_role?.toLowerCase() || 'government') as any,
    content: h.notes || `Status transitioned to ${h.status}`,
    stage: h.status as any
  }));

  return {
    id: backendProblem.issue_id || backendProblem.id,
    title: backendProblem.title,
    category: backendProblem.category as any,
    description: backendProblem.description,
    location: {
      locality: backendProblem.locality || '',
      city: backendProblem.village_town || backendProblem.district,
      district: backendProblem.district,
      state: backendProblem.state || 'Jharkhand',
      pincode: '',
      coordinates: backendProblem.latitude && backendProblem.longitude ? {
        lat: Number(backendProblem.latitude),
        lng: Number(backendProblem.longitude)
      } : undefined
    },
    severity: (backendProblem.severity || 'MEDIUM') as any,
    status,
    progressPercent: calculateProgress(status),
    reportedBy: {
      id: backendProblem.citizen_id || 'usr-citizen-demo',
      name: 'Pooja Verma'
    },
    reportedAt: backendProblem.created_at || new Date().toISOString(),
    evidence: [],
    estimatedPeopleAffected: parseInt(backendProblem.estimated_affected_population || '1200', 10) || 1200,
    upvotesCount: 1,
    hasUpvoted: true,
    solutionSummary: aiAnalysis?.recommended_action,
    milestones,
    updates
  };
}

export const problemService = {
  async getProblems(filters?: Record<string, any>): Promise<Issue[]> {
    const res = await ApiClient.get<any[]>('/problems', filters);
    if (res.success && Array.isArray(res.data)) {
      return res.data.map(p => mapBackendProblemToIssue(p));
    }
    return [];
  },

  async getProblemById(idOrIssueId: string): Promise<Issue | null> {
    const res = await ApiClient.get<any>(`/problems/${idOrIssueId}`);
    if (res.success && res.data) {
      return mapBackendProblemToIssue(res.data);
    }
    return null;
  },

  async createProblem(payload: CreateProblemPayload): Promise<{ issue: Issue; issue_id: string; message: string } | null> {
    const res = await ApiClient.post<{ problem: any; issue_id: string; message: string }>('/problems', payload);
    if (res.success && res.data) {
      const issue = mapBackendProblemToIssue(res.data.problem);
      return {
        issue,
        issue_id: res.data.issue_id,
        message: res.data.message
      };
    }
    return null;
  },

  async updateStatus(id: string, status: string, notes?: string): Promise<Issue | null> {
    const res = await ApiClient.post<any>(`/problems/${id}/status`, { status, notes });
    if (res.success && res.data) {
      return mapBackendProblemToIssue(res.data);
    }
    return null;
  }
};
