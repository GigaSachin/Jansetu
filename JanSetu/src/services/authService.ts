import { ApiClient } from './apiClient';
import { UserProfile, Role } from '../types';

export interface LoginResponseData {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: Role;
    district: string;
  };
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponseData | null> {
    const res = await ApiClient.post<LoginResponseData>('/auth/login', { email, password });
    if (res.success && res.data) {
      localStorage.setItem('jansetu_token', res.data.token);
      return res.data;
    }
    return null;
  },

  async register(data: { name: string; email: string; password: string; role: Role; district: string; phone?: string }) {
    const res = await ApiClient.post<LoginResponseData>('/auth/register', data);
    if (res.success && res.data) {
      localStorage.setItem('jansetu_token', res.data.token);
      return res.data;
    }
    return null;
  },

  async getMe(): Promise<UserProfile | null> {
    const res = await ApiClient.get<UserProfile>('/auth/me');
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  logout(): void {
    localStorage.removeItem('jansetu_token');
  }
};
