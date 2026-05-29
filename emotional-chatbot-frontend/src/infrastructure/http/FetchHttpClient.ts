import type { HttpClient } from './HttpClient';

// Fetch implementation centralizes headers, errors and JSON parsing behavior.
export class FetchHttpClient implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string, token?: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.buildHeaders(token),
    });

    return this.handleResponse<T>(response);
  }

  async post<TRequest, TResponse>(path: string, body: TRequest, token?: string): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.buildHeaders(token),
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResponse>(response);
  }

  private buildHeaders(token?: string): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload?.message ?? payload?.error ?? 'No fue posible completar la solicitud.';
      throw new Error(String(message));
    }

    return payload as T;
  }
}
