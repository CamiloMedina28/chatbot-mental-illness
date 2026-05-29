import type { ConversationGateway } from '../../domain/contracts';
import type { ConversationRecord } from '../../domain/models';
import type { EventBus } from '../events/EventBus';

// Conversation service encapsulates conversation workflows and observer notifications.
export class ConversationService {
  constructor(
    private readonly conversationGateway: ConversationGateway,
    private readonly eventBus: EventBus,
  ) {}

  async analyze(userMessage: string): Promise<ConversationRecord> {
    const created = await this.conversationGateway.analyze({ userMessage });
    this.eventBus.publish('conversation:created', {
      conversationId: created.conversationId,
      dominantEmotion: created.analysis.dominantEmotion,
    });
    return created;
  }

  async getHistory(): Promise<ConversationRecord[]> {
    const history = await this.conversationGateway.getHistory();
    this.eventBus.publish('history:updated', { total: history.length });
    return history;
  }
}
