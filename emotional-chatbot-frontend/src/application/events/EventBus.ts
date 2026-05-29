// This event map defines typed observer channels for cross-module communication.
export interface AppEvents {
  'session:changed': { isAuthenticated: boolean; correo: string | null };
  'history:updated': { total: number };
  'conversation:created': { conversationId: number; dominantEmotion: string };
}

export type AppEventName = keyof AppEvents;

type Listener<T> = (payload: T) => void;

// Observer pattern implementation to decouple producers and consumers.
export class EventBus {
  private readonly listeners = new Map<AppEventName, Set<Listener<any>>>();

  subscribe<K extends AppEventName>(event: K, listener: Listener<AppEvents[K]>): () => void {
    const eventListeners = this.listeners.get(event) ?? new Set();
    eventListeners.add(listener);
    this.listeners.set(event, eventListeners);

    return () => {
      eventListeners.delete(listener);
    };
  }

  publish<K extends AppEventName>(event: K, payload: AppEvents[K]): void {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) {
      return;
    }
    eventListeners.forEach((listener) => listener(payload));
  }
}
