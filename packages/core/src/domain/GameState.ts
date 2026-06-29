/**
 * Represents the finite states of the Crossword Engine.
 */
export type GameState =
  | 'Idle' // Engine instantiated, no puzzle loaded
  | 'Ready' // Puzzle loaded and initialized, waiting to start
  | 'Playing' // Game is active
  | 'Paused' // Game is temporarily halted
  | 'Completed'; // Puzzle is solved
