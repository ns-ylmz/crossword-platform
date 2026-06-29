/**
 * Emitted when a game session has successfully started.
 */
export interface GameStartedEvent {
  type: 'EVENT_GAME_STARTED';
  payload: { gameId: string; puzzleId: string };
  timestamp: number;
}

/**
 * Emitted when a word is successfully placed on the board.
 */
export interface WordPlacedEvent {
  type: 'EVENT_WORD_PLACED';
  payload: { x: number; y: number; direction: 'across' | 'down'; word: string; isCorrect: boolean };
  timestamp: number;
}

/**
 * The strict union of all possible events emitted by the Engine.
 * Using Discriminated Unions ensures 100% type safety and eliminates generic/unknown payloads.
 */
export type IEvent = GameStartedEvent | WordPlacedEvent;
