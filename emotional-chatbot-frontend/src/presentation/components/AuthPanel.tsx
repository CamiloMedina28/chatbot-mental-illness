import { useState } from 'react';
import { Panel } from './Panel';
import type { LoginPayload, RegisterPayload } from '../../domain/models';

interface AuthPanelProps {
  loading: boolean;
  onLogin: (payload: LoginPayload) => Promise<void>;
  onRegister: (payload: RegisterPayload) => Promise<void>;
}

// Auth panel handles registration and login without leaking form state globally.
export function AuthPanel({ loading, onLogin, onRegister }: AuthPanelProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (mode === 'login') {
      await onLogin({ correo, password });
      return;
    }

    await onRegister({ nombre, correo, password });
    setNombre('');
  };

  return (
    <Panel title="Acceso" subtitle="Inicia sesión o crea una cuenta para guardar historial.">
      <div className="mb-4 flex rounded-xl bg-mint-100 p-1">
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === 'login' ? 'bg-white text-forest-700 shadow-sm' : 'text-ink-700/80'
          }`}
          onClick={() => setMode('login')}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === 'register' ? 'bg-white text-forest-700 shadow-sm' : 'text-ink-700/80'
          }`}
          onClick={() => setMode('register')}
        >
          Registrarme
        </button>
      </div>

      <div className="space-y-3">
        {mode === 'register' ? (
          <input
            className="field"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        ) : null}

        <input
          className="field"
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(event) => setCorreo(event.target.value)}
        />

        <input
          className="field"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="button" className="btn-primary w-full" disabled={loading} onClick={submit}>
          {loading ? 'Procesando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </div>
    </Panel>
  );
}
