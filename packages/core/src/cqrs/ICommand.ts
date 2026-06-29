/**
 * Represents a request to start a new game session.
 */
export interface StartGameCommand {
  type: 'COMMAND_START_GAME';
  payload: { puzzleId: string };
  timestamp: number;
}

/**
 * Represents a request from a user to place a word on the board.
 */
export interface PlaceWordCommand {
  type: 'COMMAND_PLACE_WORD';
  payload: { x: number; y: number; direction: 'across' | 'down'; word: string };
  timestamp: number;
}

/**
 * The strict union of all possible commands supported by the Engine.
 * Using Discriminated Unions ensures 100% type safety and eliminates generic/unknown payloads.
 */
export type ICommand = StartGameCommand | PlaceWordCommand;
