// Specific payload structures
export type GameStartedPayload = { gameId: string; puzzleId: string };
export type WordPlacedPayload = {
  x: number;
  y: number;
  direction: 'across' | 'down';
  word: string;
  isCorrect: boolean;
};

export type IEventPayload = GameStartedPayload | WordPlacedPayload;

// All possible event types
export type EventType = 'EVENT_GAME_STARTED' | 'EVENT_WORD_PLACED';

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
