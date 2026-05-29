import { Panel } from './Panel';
import type { ConversationRecord } from '../../domain/models';
import { EmotionPresentationStrategy } from '../../application/strategies/EmotionPresentationStrategy';

interface EmotionInsightsProps {
  conversation: ConversationRecord | null;
}

const strategy = new EmotionPresentationStrategy();

// Insights panel uses strategy resolution to render emotion-specific styling.
export function EmotionInsights({ conversation }: EmotionInsightsProps) {
  const dominantEmotion = conversation?.analysis.dominantEmotion ?? 'calma';
  const visualRule = strategy.resolve(dominantEmotion);
  const emotions = conversation?.analysis.emotions ?? [];

  return (
    <Panel title="Insights" subtitle="Resumen emocional del mensaje analizado.">
      <div className={`rounded-2xl border p-4 ${visualRule.panelClassName}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-700/70">Emoción dominante</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <strong className="text-lg text-slate-800">{visualRule.label}</strong>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${visualRule.badgeClassName}`}>
            {dominantEmotion}
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {emotions.length === 0 ? (
          <li className="rounded-xl border border-mint-200 bg-mint-50/70 px-3 py-2 text-sm text-ink-700/80">
            Los porcentajes aparecerán cuando envíes un mensaje.
          </li>
        ) : (
          emotions.map((emotion) => (
            <li key={emotion.name} className="rounded-xl border border-mint-200 bg-white px-3 py-2">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                <span className="capitalize">{emotion.name}</span>
                <span className="font-semibold text-forest-700">{emotion.percentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-mint-100">
                <div
                  className="h-full rounded-full bg-mint-400"
                  style={{ width: `${emotion.percentage}%` }}
                  aria-hidden="true"
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </Panel>
  );
}
