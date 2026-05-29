import { AnalyzeConversationCommand, LoadHistoryCommand } from '../../application/commands/ConversationCommands';
import { LoginCommand, LogoutCommand, RegisterCommand } from '../../application/commands/AuthCommands';
import type { AppDependencies } from '../../application/factories/AppFactory';
import type { ConversationRecord, LoginPayload, RegisterPayload } from '../../domain/models';

export interface AppState {
  isAuthenticated: boolean;
  correo: string | null;
  loading: boolean;
  error: string | null;
  info: string | null;
  history: ConversationRecord[];
  selectedConversation: ConversationRecord | null;
}

type Listener = (state: AppState) => void;

// App store centralizes UI state and orchestrates command-based mutations.
export class AppStore {
  private state: AppState = {
    isAuthenticated: false,
    correo: null,
    loading: false,
    error: null,
    info: null,
    history: [],
    selectedConversation: null,
  };

  private readonly listeners = new Set<Listener>();

  constructor(private readonly deps: AppDependencies) {
    // Observer subscriptions keep state synced with domain events.
    this.deps.eventBus.subscribe('session:changed', ({ isAuthenticated, correo }) => {
      this.patch({ isAuthenticated, correo });
      if (!isAuthenticated) {
        this.patch({ history: [], selectedConversation: null });
      }
    });
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getSnapshot(): AppState {
    return this.state;
  }

  getEmotionStrategy() {
    return this.deps.emotionStrategy;
  }

  async initialize(): Promise<void> {
    if (!this.deps.authService.isAuthenticated()) {
      return;
    }
    this.patch({ isAuthenticated: true });
    await this.loadHistory();
  }

  async register(payload: RegisterPayload): Promise<void> {
    this.patch({ loading: true, error: null, info: null });
    try {
      const message = await this.deps.commandBus.dispatch(new RegisterCommand(this.deps.authService, payload));
      this.patch({ info: message || 'Registro completado. Ahora puedes iniciar sesión.' });
    } catch (error) {
      this.patch({ error: this.toMessage(error) });
    } finally {
      this.patch({ loading: false });
    }
  }

  async login(payload: LoginPayload): Promise<void> {
    this.patch({ loading: true, error: null, info: null });
    try {
      await this.deps.commandBus.dispatch(new LoginCommand(this.deps.authService, payload));
      this.patch({ info: 'Sesión iniciada correctamente.' });
      await this.loadHistory();
    } catch (error) {
      this.patch({ error: this.toMessage(error) });
    } finally {
      this.patch({ loading: false });
    }
  }

  async logout(): Promise<void> {
    await this.deps.commandBus.dispatch(new LogoutCommand(this.deps.authService));
    this.patch({ info: 'Sesión cerrada.' });
  }

  async analyze(userMessage: string): Promise<void> {
    this.patch({ loading: true, error: null, info: null });
    try {
      const created = await this.deps.commandBus.dispatch(
        new AnalyzeConversationCommand(this.deps.conversationService, userMessage),
      );
      const history = [...this.state.history, created];
      this.patch({ history, selectedConversation: created });
    } catch (error) {
      this.patch({ error: this.toMessage(error) });
    } finally {
      this.patch({ loading: false });
    }
  }

  async loadHistory(): Promise<void> {
    this.patch({ loading: true, error: null });
    try {
      const history = await this.deps.commandBus.dispatch(
        new LoadHistoryCommand(this.deps.conversationService),
      );
      this.patch({
        history,
        selectedConversation: history.length > 0 ? history[history.length - 1] : null,
      });
    } catch (error) {
      this.patch({ error: this.toMessage(error) });
    } finally {
      this.patch({ loading: false });
    }
  }

  selectConversation(conversationId: number): void {
    const selectedConversation = this.state.history.find(
      (conversation) => conversation.conversationId === conversationId,
    );
    this.patch({ selectedConversation: selectedConversation ?? null });
  }

  private patch(partial: Partial<AppState>): void {
    this.state = {
      ...this.state,
      ...partial,
    };
    this.listeners.forEach((listener) => listener(this.state));
  }

  private toMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Se produjo un error inesperado.';
  }
}
