export type ClueDirection = 'across' | 'down';

/**
 * Represents a single hint/clue for a word.
 */
export interface IClue {
  number: number;
  direction: ClueDirection;
  text: string; // The actual hint (e.g., "Capital of France")
  answerLength: number;
  startX: number; // X coordinate where the word begins
  startY: number; // Y coordinate where the word begins
}
