import type { ClueDirection } from '../domain/IClue.js';

// Specific payload structures
export type GameStartedPayload = { gameId: string; puzzleId: string };
export type WordPlacedPayload = {
  x: number;
  y: number;
  direction: ClueDirection;
  word: string;
  isCorrect: boolean;
};

export type EmptyEventPayload = Record<string, never>;

export type IEventPayload = GameStartedPayload | WordPlacedPayload | EmptyEventPayload;

// All possible event types
export type EventType =
  | 'EVENT_GAME_STARTED'
  | 'EVENT_WORD_PLACED'
  | 'EVENT_GAME_PAUSED'
  | 'EVENT_GAME_RESUMED'
  | 'EVENT_GAME_FINISHED';

/**
 * Represents a historical fact; something that has already occurred.
 */
export interface IEvent<
  TType extends EventType = EventType,
  TPayload extends IEventPayload = IEventPayload,
> {
  type: TType;
  payload: TPayload;
  timestamp: number;
}
