import type { ClueDirection } from '../domain/IClue.js';
import type { IMessage } from '../domain/IMessage.js';

export const CommandTypes = {
  START_GAME: 'COMMAND_START_GAME',
  UPDATE_CELL: 'COMMAND_UPDATE_CELL',
  PAUSE_GAME: 'COMMAND_PAUSE_GAME',
  RESUME_GAME: 'COMMAND_RESUME_GAME',
  FINISH_GAME: 'COMMAND_FINISH_GAME',
} as const;

export type EmptyPayload = Record<string, never>;

export type StartGameCommand = IMessage<typeof CommandTypes.START_GAME, { puzzleId: string }>;

export type UpdateCellCommand = IMessage<
  typeof CommandTypes.UPDATE_CELL,
  { x: number; y: number; value: string }
>;

export type PauseGameCommand = IMessage<typeof CommandTypes.PAUSE_GAME, EmptyPayload>;

export type ResumeGameCommand = IMessage<typeof CommandTypes.RESUME_GAME, EmptyPayload>;

export type FinishGameCommand = IMessage<typeof CommandTypes.FINISH_GAME, EmptyPayload>;

/**
 * Represents an intent to alter the Engine's state.
 */
export type ICommand =
  StartGameCommand | UpdateCellCommand | PauseGameCommand | ResumeGameCommand | FinishGameCommand;
