interface StatusBannerProps {
  error: string | null;
  info: string | null;
}

// Status banner provides immediate feedback for user actions and API outcomes.
export function StatusBanner({ error, info }: StatusBannerProps) {
  if (!error && !info) {
    return null;
  }

  return (
    <div
      className={`panel border ${
        error ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      <p className="text-sm font-medium">{error ?? info}</p>
    </div>
  );
}
