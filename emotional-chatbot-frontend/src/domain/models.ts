// These models represent the immutable contract shared by UI and services.
export interface AuthResponse {
  token: string;
  type: string;
}

export interface LoginPayload {
  correo: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  correo: string;
  password: string;
}

export interface EmotionScore {
  name: string;
  percentage: number;
}

export interface EmotionAnalysis {
  dominantEmotion: string;
  emotions: EmotionScore[];
}

export interface ConversationRecord {
  conversationId: number;
  userMessage: string;
  analysis: EmotionAnalysis;
  botResponse: string;
  disclaimer: string;
  createdAt: string;
}

export interface AnalyzePayload {
  userMessage: string;
}

export interface UserSession {
  correo: string;
  token: string;
  tokenType: string;
}
