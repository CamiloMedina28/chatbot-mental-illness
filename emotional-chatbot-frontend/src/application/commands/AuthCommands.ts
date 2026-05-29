import type { Command } from './Command';
import type { LoginPayload, RegisterPayload } from '../../domain/models';
import type { AuthService } from '../services/AuthService';

// Login command wraps the login use case as a reusable action object.
export class LoginCommand implements Command<void> {
  constructor(
    private readonly authService: AuthService,
    private readonly payload: LoginPayload,
  ) {}

  execute(): Promise<void> {
    return this.authService.login(this.payload);
  }
}

// Register command wraps user registration with the same command lifecycle.
export class RegisterCommand implements Command<string> {
  constructor(
    private readonly authService: AuthService,
    private readonly payload: RegisterPayload,
  ) {}

  execute(): Promise<string> {
    return this.authService.register(this.payload);
  }
}

// Logout command keeps logout behavior consistent with other actions.
export class LogoutCommand implements Command<void> {
  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    this.authService.logout();
  }
}
