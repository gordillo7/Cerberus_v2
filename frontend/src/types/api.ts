// API Types
export interface StatsResponse {
  reports_count: number;
  modules_count: number;
  clients_count: number;
}

export interface RecentScan {
  target: string;
  date: string;
  status: 'Completed' | 'Aborted';
}

export interface Report {
  filename: string;
}

export interface Project {
  id: string;
  name: string;
  target: string;
  created_at: string;
}

export interface ProjectReport {
  filename: string;
}

export interface ApiToken {
  token: string;
}

export interface ProxyConfig {
  enabled: boolean;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

export interface GeminiToken {
  token: string;
}

export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  response: string;
}
