interface TopBarProps {
  correo: string | null;
  onLogout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Top bar surfaces session state and primary app actions.
export function TopBar({ correo, onLogout, isAuthenticated }: TopBarProps) {
  return (
    <header className="panel flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-700/70">Acompañamiento emocional</p>
        <h1 className="mt-1 text-2xl font-semibold text-forest-800">Espacio de escucha inicial</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-mint-100 px-3 py-1 text-sm text-forest-700">
          {isAuthenticated ? correo ?? 'Sesión activa' : 'Invitado'}
        </span>
        {isAuthenticated ? (
          <button type="button" className="btn-secondary" onClick={onLogout}>
            Cerrar sesión
          </button>
        ) : null}
      </div>
    </header>
  );
}
