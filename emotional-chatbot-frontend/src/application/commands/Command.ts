// Command pattern contract for user-triggered operations.
export interface Command<T = void> {
  execute(): Promise<T>;
}
