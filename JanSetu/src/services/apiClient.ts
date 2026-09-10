/**
 * JanSetu Unified API Gateway Client
 * Communicates with the Node.js Express backend (default: http://localhost:5000/api)
 */

const rawApiUrl = (import.meta as any).env?.VITE_API_URL || (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export class ApiClient {
  private static getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = localStorage.getItem('jansetu_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  public static async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      let url = `${API_BASE_URL}${endpoint}`;
      if (params) {
        const searchParams = new URLSearchParams();
        for (const [k, v] of Object.entries(params)) {
          if (v !== undefined && v !== null && v !== '') {
            searchParams.append(k, String(v));
          }
        }
        const qs = searchParams.toString();
        if (qs) url += `?${qs}`;
      }

      const res = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: err.message || 'Failed to connect to backend server'
        }
      };
    }
  }

  public static async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: err.message || 'Failed to connect to backend server'
        }
      };
    }
  }

  public static async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: err.message || 'Failed to connect to backend server'
        }
      };
    }
  }
}
