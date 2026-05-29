import type { TokenStore } from '../../domain/contracts';

const TOKEN_KEY = 'emotional_chatbot_token';

// LocalStorage adapter keeps token persistence details out of business logic.
export class TokenStorage implements TokenStore {
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(TOKEN_KEY);
  }
}
