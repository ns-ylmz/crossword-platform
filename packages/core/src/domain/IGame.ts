import type { GameState } from './GameState.js';
import type { IPuzzle } from './IPuzzle.js';

/**
 * Represents the Dynamic State of an active crossword session.
 */
export interface IGame {
  id: string;
  puzzle: IPuzzle; // The underlying static puzzle (Read-Only)
  state: GameState; // Idle, Ready, Playing, Paused, Completed
  timerMs: number; // Elapsed time in milliseconds
  score: number;
  userAnswers: Record<string, string>; // Maps coordinate string "x,y" to the user's input letter
}
