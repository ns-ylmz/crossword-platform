import type { ClueDirection } from '../domain/IClue.js';

// Specific payload structures
export type StartGamePayload = { puzzleId: string };
export type PlaceWordPayload = { x: number; y: number; direction: ClueDirection; word: string };

export type EmptyPayload = Record<string, never>;

export type ICommandPayload = StartGamePayload | PlaceWordPayload | EmptyPayload;

// All possible command types
export type CommandType =
  | 'COMMAND_START_GAME'
  | 'COMMAND_PLACE_WORD'
  | 'COMMAND_PAUSE_GAME'
  | 'COMMAND_RESUME_GAME'
  | 'COMMAND_FINISH_GAME';

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
