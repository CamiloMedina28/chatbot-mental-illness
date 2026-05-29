import { useEffect, useMemo, useState } from 'react';
import { AppFactory } from '../../application/factories/AppFactory';
import { AppStore, type AppState } from '../state/AppStore';

// This hook exposes a stable app store instance to presentation components.
export function useAppStore(): { store: AppStore; state: AppState } {
  const store = useMemo(() => {
    const deps = AppFactory.create();
    return new AppStore(deps);
  }, []);

  const [state, setState] = useState<AppState>(store.getSnapshot());

  useEffect(() => store.subscribe(setState), [store]);

  return { store, state };
}
