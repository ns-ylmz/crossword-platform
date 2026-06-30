import type { IPuzzle } from './IPuzzle.js';

/**
 * Represents the finite states of the Crossword Engine.
 */
export type GameState =
  | 'Idle' // Engine instantiated, no puzzle loaded
  | 'Ready' // Puzzle loaded and initialized, waiting to start
  | 'Playing' // Game is active
  | 'Paused' // Game is temporarily halted
  | 'Completed'; // Puzzle is solved

/**
 * Represents the Dynamic State of an active crossword session.
 */
export interface IGame {
  id: string;
  puzzle: IPuzzle; // The underlying static puzzle (Read-Only)
  state: GameState; // Idle, Ready, Playing, Paused, Completed
  timerMs: number; // Time elapsed in milliseconds
  userAnswers: Record<string, { value: string; isCorrect: boolean }>; // Key: "x,y", Value: typed letter and correctness
}
