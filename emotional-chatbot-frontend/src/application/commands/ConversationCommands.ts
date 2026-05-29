import type { Command } from './Command';
import type { ConversationRecord } from '../../domain/models';
import type { ConversationService } from '../services/ConversationService';

// Analyze command converts a user message into a persisted backend conversation.
export class AnalyzeConversationCommand implements Command<ConversationRecord> {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly message: string,
  ) {}

  execute(): Promise<ConversationRecord> {
    return this.conversationService.analyze(this.message);
  }
}

// History command retrieves prior conversations for the authenticated user.
export class LoadHistoryCommand implements Command<ConversationRecord[]> {
  constructor(private readonly conversationService: ConversationService) {}

  execute(): Promise<ConversationRecord[]> {
    return this.conversationService.getHistory();
  }
}
