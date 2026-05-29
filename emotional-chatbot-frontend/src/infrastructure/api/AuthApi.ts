import type { AuthGateway } from '../../domain/contracts';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../../domain/models';
import type { HttpClient } from '../http/HttpClient';

// Auth gateway implementation maps domain operations to backend endpoints.
export class AuthApi implements AuthGateway {
  constructor(private readonly httpClient: HttpClient) {}

  login(payload: LoginPayload): Promise<AuthResponse> {
    return this.httpClient.post<LoginPayload, AuthResponse>('/auth/login', payload);
  }

  register(payload: RegisterPayload): Promise<{ message: string }> {
    return this.httpClient.post<RegisterPayload, { message: string }>('/auth/register', payload);
  }
}
