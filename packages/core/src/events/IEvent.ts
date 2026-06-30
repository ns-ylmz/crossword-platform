import type { ClueDirection } from '../domain/IClue.js';
import type { IMessage } from '../domain/IMessage.js';

export const EventTypes = {
  GAME_STARTED: 'EVENT_GAME_STARTED',
  CELL_UPDATED: 'EVENT_CELL_UPDATED',
  GAME_PAUSED: 'EVENT_GAME_PAUSED',
  GAME_RESUMED: 'EVENT_GAME_RESUMED',
  GAME_FINISHED: 'EVENT_GAME_FINISHED',
} as const;

export type EmptyEventPayload = Record<string, never>;

export type GameStartedEvent = IMessage<
  typeof EventTypes.GAME_STARTED,
  { gameId: string; puzzleId: string }
>;

export type CellUpdatedEvent = IMessage<
  typeof EventTypes.CELL_UPDATED,
  { x: number; y: number; value: string; isCorrect: boolean }
> & { timestamp: number };

export type GamePausedEvent = IMessage<typeof EventTypes.GAME_PAUSED, EmptyEventPayload>;

export type GameResumedEvent = IMessage<typeof EventTypes.GAME_RESUMED, EmptyEventPayload>;

export type GameFinishedEvent = IMessage<typeof EventTypes.GAME_FINISHED, EmptyEventPayload>;

/**
 * Represents a historical fact; something that has already occurred.
 */
export type IEvent =
  GameStartedEvent | CellUpdatedEvent | GamePausedEvent | GameResumedEvent | GameFinishedEvent;
