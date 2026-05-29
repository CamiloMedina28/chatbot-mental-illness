import type { ConversationGateway, TokenStore } from '../../domain/contracts';
import type { AnalyzePayload, ConversationRecord } from '../../domain/models';
import type { HttpClient } from '../http/HttpClient';

// Conversation gateway handles authenticated chat analysis and history retrieval.
export class ConversationApi implements ConversationGateway {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenStore: TokenStore,
  ) {}

  analyze(payload: AnalyzePayload): Promise<ConversationRecord> {
    return this.httpClient.post<AnalyzePayload, ConversationRecord>(
      '/conversations/analyze',
      payload,
      this.requireToken(),
    );
  }

  getHistory(): Promise<ConversationRecord[]> {
    return this.httpClient.get<ConversationRecord[]>('/conversations/history', this.requireToken());
  }

  private requireToken(): string {
    const token = this.tokenStore.getToken();
    if (!token) {
      throw new Error('Debes iniciar sesión para continuar.');
    }
    return token;
  }
}
