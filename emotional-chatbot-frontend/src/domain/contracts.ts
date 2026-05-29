import type {
  AnalyzePayload,
  AuthResponse,
  ConversationRecord,
  LoginPayload,
  RegisterPayload,
} from './models';

// This abstraction allows different HTTP or mock implementations by environment.
export interface AuthGateway {
  login(payload: LoginPayload): Promise<AuthResponse>;
  register(payload: RegisterPayload): Promise<{ message: string }>;
}

// This abstraction isolates conversation use cases from transport details.
export interface ConversationGateway {
  analyze(payload: AnalyzePayload): Promise<ConversationRecord>;
  getHistory(): Promise<ConversationRecord[]>;
}

// This abstraction supports replacing localStorage with another persistence layer.
export interface TokenStore {
  getToken(): string | null;
  saveToken(token: string): void;
  clearToken(): void;
}
