// Strict, serializable JSON-compatible payload rules
export type CommandPayloadValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | CommandPayloadValue[]
  | { [key: string]: CommandPayloadValue };

export type ICommandPayload = Record<string, CommandPayloadValue>;

// All possible command types
export type CommandType = 'COMMAND_START_GAME' | 'COMMAND_PLACE_WORD';

/**
 * Represents an intent to alter the Engine's state.
 */
export interface ICommand<
  TType extends CommandType = CommandType,
  TPayload extends ICommandPayload = ICommandPayload,
> {
  type: TType;
  payload: TPayload;
  timestamp: number;
}
