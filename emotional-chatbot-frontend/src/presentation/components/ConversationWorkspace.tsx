import { useState } from 'react';
import { Panel } from './Panel';
import type { ConversationRecord } from '../../domain/models';

interface ConversationWorkspaceProps {
  conversation: ConversationRecord | null;
  loading: boolean;
  onAnalyze: (message: string) => Promise<void>;
}

// Workspace renders current chat result and accepts a new user message.
export function ConversationWorkspace({ conversation, loading, onAnalyze }: ConversationWorkspaceProps) {
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!message.trim()) {
      return;
    }
    await onAnalyze(message.trim());
    setMessage('');
  };

  return (
    <Panel
      title="Conversación"
      subtitle="Comparte cómo te sientes. Recibirás orientación inicial no clínica."
      className="h-full"
    >
      <div className="mb-4 space-y-3">
        <div className="rounded-2xl bg-mint-100/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700/70">Tu mensaje</p>
          <p className="mt-2 text-sm text-slate-700">{conversation?.userMessage ?? 'Escribe un mensaje para iniciar.'}</p>
        </div>

        <div className="rounded-2xl border border-mint-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700/70">Respuesta del sistema</p>
          <p className="mt-2 text-sm text-slate-700">
            {conversation?.botResponse ?? 'Aquí aparecerá la orientación inicial del chatbot.'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-mint-200 bg-mint-50/60 p-3">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-700">
          Nuevo mensaje
        </label>
        <textarea
          id="message"
          className="field min-h-28 resize-y"
          placeholder="Ejemplo: hoy me siento muy ansioso por mis exámenes..."
          value={message}
          maxLength={3000}
          onChange={(event) => setMessage(event.target.value)}
        />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-ink-700/70">{message.length}/3000</p>
          <button type="button" className="btn-primary" disabled={loading} onClick={submit}>
            {loading ? 'Analizando...' : 'Enviar y analizar'}
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-700/80">
        Este sistema no realiza diagnósticos clínicos ni reemplaza la atención profesional.
      </p>
    </Panel>
  );
}
