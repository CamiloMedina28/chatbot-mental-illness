import type { PropsWithChildren } from 'react';

interface PanelProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  className?: string;
}

// Reusable panel component keeps consistent structure and visual rhythm.
export function Panel({ title, subtitle, className = '', children }: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      <header className="mb-4">
        <h2 className="text-base font-semibold text-forest-700">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-ink-700/80">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}
