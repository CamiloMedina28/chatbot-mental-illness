import { env } from '../../config/env';
import { CommandBus } from '../commands/CommandBus';
import { EventBus } from '../events/EventBus';
import { EmotionPresentationStrategy } from '../strategies/EmotionPresentationStrategy';
import { AuthService } from '../services/AuthService';
import { ConversationService } from '../services/ConversationService';
import { AuthApi } from '../../infrastructure/api/AuthApi';
import { ConversationApi } from '../../infrastructure/api/ConversationApi';
import { TokenStorage } from '../../infrastructure/auth/TokenStorage';
import { FetchHttpClient } from '../../infrastructure/http/FetchHttpClient';

// Factory pattern composes app dependencies in one maintainable composition root.
export class AppFactory {
  static create() {
    const eventBus = new EventBus();
    const commandBus = new CommandBus();
    const tokenStorage = new TokenStorage();
    const httpClient = new FetchHttpClient(env.apiBaseUrl);

    const authApi = new AuthApi(httpClient);
    const conversationApi = new ConversationApi(httpClient, tokenStorage);

    const authService = new AuthService(authApi, tokenStorage, eventBus);
    const conversationService = new ConversationService(conversationApi, eventBus);
    const emotionStrategy = new EmotionPresentationStrategy();

    return {
      commandBus,
      eventBus,
      authService,
      conversationService,
      emotionStrategy,
    };
  }
}

// Shared dependency type keeps constructors strongly typed without leaking implementation details.
export type AppDependencies = ReturnType<typeof AppFactory.create>;
