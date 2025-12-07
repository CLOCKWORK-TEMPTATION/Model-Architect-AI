export interface ModelEntry {
  model_name: string;
  provider: string;
  parameters: number | string; // in billions or description
  context_window: number; // in tokens
  capabilities: string[];
  avg_latency: number; // ms per token
  cost_per_1k_tokens: number; // USD
  fine_tune_available: boolean;
  knowledge_cutoff: string;
  safety_rating: number; // 1-10
}

export interface Candidate {
  model_name: string;
  cost_per_1k_tokens: number;
  context_window: number;
  avg_latency: number;
  score: number; // 1-100 weighted score
  reasoning_brief: string;
}

export interface AnalysisResult {
  scratchpad: string;
  reasoning: string;
  recommendation: string;
  fine_tuning_tip?: string;
  candidates: Candidate[];
  raw: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface AnalysisError {
  message: string;
}