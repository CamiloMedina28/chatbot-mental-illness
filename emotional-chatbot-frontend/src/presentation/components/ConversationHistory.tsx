import { Panel } from './Panel';
import type { ConversationRecord } from '../../domain/models';

interface ConversationHistoryProps {
  history: ConversationRecord[];
  selectedConversationId: number | null;
  onSelectConversation: (conversationId: number) => void;
}

// History list enables quick navigation across previous analyses.
export function ConversationHistory({
  history,
  selectedConversationId,
  onSelectConversation,
}: ConversationHistoryProps) {
  return (
    <Panel title="Historial" subtitle="Tus conversaciones anteriores se guardan aquí.">
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-sm text-ink-700/70">Aún no hay conversaciones guardadas.</p>
        ) : (
          history.map((item) => (
            <button
              key={item.conversationId}
              type="button"
              onClick={() => onSelectConversation(item.conversationId)}
              className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                selectedConversationId === item.conversationId
                  ? 'border-mint-400 bg-mint-100/70'
                  : 'border-mint-200 bg-white hover:bg-mint-50'
              }`}
            >
              <p className="line-clamp-2 text-sm text-slate-700">{item.userMessage}</p>
              <p className="mt-2 text-xs text-ink-700/70">{new Date(item.createdAt).toLocaleString()}</p>
            </button>
          ))
        )}
      </div>
    </Panel>
  );
}
