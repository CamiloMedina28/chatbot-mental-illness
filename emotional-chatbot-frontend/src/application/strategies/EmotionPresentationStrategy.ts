// Strategy map defines UI behavior per dominant emotion without condition clutter.
interface EmotionVisualRule {
  label: string;
  badgeClassName: string;
  panelClassName: string;
}

const rules: Record<string, EmotionVisualRule> = {
  alegria: {
    label: 'Alegria',
    badgeClassName: 'bg-emerald-100 text-emerald-700',
    panelClassName: 'border-emerald-200 bg-emerald-50/70',
  },
  tristeza: {
    label: 'Tristeza',
    badgeClassName: 'bg-cyan-100 text-cyan-700',
    panelClassName: 'border-cyan-200 bg-cyan-50/70',
  },
  ansiedad: {
    label: 'Ansiedad',
    badgeClassName: 'bg-amber-100 text-amber-700',
    panelClassName: 'border-amber-200 bg-amber-50/70',
  },
  enojo: {
    label: 'Enojo',
    badgeClassName: 'bg-rose-100 text-rose-700',
    panelClassName: 'border-rose-200 bg-rose-50/70',
  },
  miedo: {
    label: 'Miedo',
    badgeClassName: 'bg-violet-100 text-violet-700',
    panelClassName: 'border-violet-200 bg-violet-50/70',
  },
  estres: {
    label: 'Estrés',
    badgeClassName: 'bg-orange-100 text-orange-700',
    panelClassName: 'border-orange-200 bg-orange-50/70',
  },
  calma: {
    label: 'Calma',
    badgeClassName: 'bg-mint-100 text-forest-700',
    panelClassName: 'border-mint-200 bg-mint-50/90',
  },
};

const defaultRule: EmotionVisualRule = {
  label: 'Estado emocional',
  badgeClassName: 'bg-slate-100 text-slate-700',
  panelClassName: 'border-slate-200 bg-slate-50/70',
};

// Strategy resolver keeps emotional UI extendable and closed for modification.
export class EmotionPresentationStrategy {
  resolve(dominantEmotion: string): EmotionVisualRule {
    return rules[dominantEmotion] ?? defaultRule;
  }
}
