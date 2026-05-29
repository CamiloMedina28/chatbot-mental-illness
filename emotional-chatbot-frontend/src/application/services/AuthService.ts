import type { AuthGateway, TokenStore } from '../../domain/contracts';
import type { LoginPayload, RegisterPayload } from '../../domain/models';
import type { EventBus } from '../events/EventBus';

// Auth service coordinates login state transitions and session events.
export class AuthService {
  private currentCorreo: string | null = null;

  constructor(
    private readonly authGateway: AuthGateway,
    private readonly tokenStore: TokenStore,
    private readonly eventBus: EventBus,
  ) {}

  async login(payload: LoginPayload): Promise<void> {
    const response = await this.authGateway.login(payload);
    this.tokenStore.saveToken(response.token);
    this.currentCorreo = payload.correo;
    this.eventBus.publish('session:changed', { isAuthenticated: true, correo: payload.correo });
  }

  async register(payload: RegisterPayload): Promise<string> {
    const response = await this.authGateway.register(payload);
    return response.message;
  }

  logout(): void {
    this.currentCorreo = null;
    this.tokenStore.clearToken();
    this.eventBus.publish('session:changed', { isAuthenticated: false, correo: null });
  }

  isAuthenticated(): boolean {
    return Boolean(this.tokenStore.getToken());
  }

  getCurrentCorreo(): string | null {
    return this.currentCorreo;
  }
}
