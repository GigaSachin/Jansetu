import { ApiClient } from './apiClient';
import { Institution } from '../types';

export const institutionService = {
  async getInstitutions(filters?: { district?: string; domain?: string; type?: string; search?: string }): Promise<Institution[]> {
    const res = await ApiClient.get<any[]>('/institutions', filters);
    if (res.success && Array.isArray(res.data)) {
      return res.data.map((inst: any) => ({
        id: inst.id,
        name: inst.name,
        shortName: inst.short_name || inst.name,
        type: inst.type || 'State University',
        city: inst.district,
        state: inst.state || 'Jharkhand',
        verified: inst.verified ?? true,
        logo: '',
        departments: Array.isArray(inst.domains) ? inst.domains : [],
        activeProjectsCount: inst.active_projects_count || 0,
        solvedCount: inst.solved_count || 0
      }));
    }
    return [];
  },

  async getDistricts(): Promise<string[]> {
    const res = await ApiClient.get<string[]>('/institutions/districts');
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  }
};
