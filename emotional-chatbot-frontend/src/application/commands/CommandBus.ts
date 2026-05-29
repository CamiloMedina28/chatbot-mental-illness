import type { Command } from './Command';

// Command bus coordinates action execution while keeping UI handlers minimal.
export class CommandBus {
  async dispatch<T>(command: Command<T>): Promise<T> {
    return command.execute();
  }
}
