import { useEffect } from 'react';
import { AuthPanel } from '../components/AuthPanel';
import { ConversationHistory } from '../components/ConversationHistory';
import { ConversationWorkspace } from '../components/ConversationWorkspace';
import { EmotionInsights } from '../components/EmotionInsights';
import { StatusBanner } from '../components/StatusBanner';
import { TopBar } from '../components/TopBar';
import { useAppStore } from '../hooks/useAppStore';

// Main screen composes modules and delegates actions to the centralized store.
export function AppScreen() {
  const { store, state } = useAppStore();

  useEffect(() => {
    void store.initialize();
  }, [store]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-6 lg:px-6">
      <TopBar
        correo={state.correo}
        isAuthenticated={state.isAuthenticated}
        onLogout={() => store.logout()}
      />

      <StatusBanner error={state.error} info={state.info} />

      {!state.isAuthenticated ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
          <AuthPanel
            loading={state.loading}
            onLogin={(payload) => store.login(payload)}
            onRegister={(payload) => store.register(payload)}
          />

          <ConversationWorkspace
            conversation={state.selectedConversation}
            loading={state.loading}
            onAnalyze={(message) => store.analyze(message)}
          />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr_320px]">
          <ConversationHistory
            history={state.history}
            selectedConversationId={state.selectedConversation?.conversationId ?? null}
            onSelectConversation={(conversationId) => store.selectConversation(conversationId)}
          />

          <ConversationWorkspace
            conversation={state.selectedConversation}
            loading={state.loading}
            onAnalyze={(message) => store.analyze(message)}
          />

          <EmotionInsights conversation={state.selectedConversation} />
        </div>
      )}
    </main>
  );
}
