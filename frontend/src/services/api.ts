import axios from 'axios';
import {
  StatsResponse,
  RecentScan,
  Report,
  Project,
  ProjectReport,
  ProxyConfig,
  ChatMessage,
  ChatResponse,
} from '@/types/api';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Stats API
export const statsAPI = {
  getStats: () => api.get<StatsResponse>('/stats'),
  getRecentScans: () => api.get<RecentScan[]>('/recent-scans'),
};

// Reports API
export const reportsAPI = {
  getReports: () => api.get<Report[]>('/reports'),
  deleteReport: (filename: string) => api.delete(`/reports/${filename}`),
};

// Projects API
export const projectsAPI = {
  getProjects: () => api.get<Project[]>('/projects'),
  createProject: (data: { name: string; target: string }) =>
    api.post<Project>('/projects', data),
  deleteProject: (projectId: string) => api.delete(`/projects/${projectId}`),
  getProjectReports: (projectId: string) =>
    api.get<ProjectReport[]>(`/projects/${projectId}/reports`),
  deleteProjectReport: (projectId: string, filename: string) =>
    api.delete(`/projects/${projectId}/reports/${filename}`),
  chatWithProject: (projectId: string, message: ChatMessage) =>
    api.post<ChatResponse>(`/projects/${projectId}/chat`, message),
  generateNextOffensive: (projectId: string) =>
    api.post(`/projects/${projectId}/next_offensive`),
  generateNextDefensive: (projectId: string) =>
    api.post(`/projects/${projectId}/next_defensive`),
};

// Settings API - Tokens
export const settingsAPI = {
  // WPScan
  getWPScanToken: () => api.get<{ token: string }>('/settings/wpscan-token'),
  setWPScanToken: (token: string) =>
    api.post('/settings/wpscan-token', { token }),

  // DNSDumpster
  getDNSDumpsterToken: () =>
    api.get<{ token: string }>('/settings/dnsdumpster-token'),
  setDNSDumpsterToken: (token: string) =>
    api.post('/settings/dnsdumpster-token', { token }),

  // MX ToolBox
  getMXToolBoxToken: () =>
    api.get<{ token: string }>('/settings/mxtoolbox-token'),
  setMXToolBoxToken: (token: string) =>
    api.post('/settings/mxtoolbox-token', { token }),

  // API Ninja
  getAPINinjaToken: () =>
    api.get<{ token: string }>('/settings/apininja-token'),
  setAPINinjaToken: (token: string) =>
    api.post('/settings/apininja-token', { token }),

  // IntelligenceX
  getIntelXToken: () =>
    api.get<{ token: string }>('/settings/intelx-token'),
  setIntelXToken: (token: string) =>
    api.post('/settings/intelx-token', { token }),

  // Gemini
  getGeminiToken: () => api.get<{ token: string }>('/settings/gemini-token'),
  setGeminiToken: (token: string) =>
    api.post('/settings/gemini-token', { token }),

  // Proxy Configuration
  getProxyConfig: () =>
    api.get<ProxyConfig>('/settings/proxy-config'),
  setProxyConfig: (config: ProxyConfig) =>
    api.post('/settings/proxy-config', config),
};

// Scanner API
export const scannerAPI = {
  startFullScan: (formData: FormData) =>
    axios.post<string>('/fullscan', formData, {
      responseType: 'stream',
      timeout: 0,
    }),
  stopScan: () => api.post('/stopscan'),
};

export default api;
