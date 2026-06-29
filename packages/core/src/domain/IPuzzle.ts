/**
 * Represents the structural definition of a crossword puzzle.
 */
export interface IPuzzle {
  id: string;
  title?: string;
  author?: string;
  width: number;
  height: number;
  /**
   * A 2D array representing the board.
   * Empty cells or block cells can be represented according to specific conventions (e.g., '.' for blocks).
   */
  grid: string[][];
  clues: {
    across: Record<number, string>;
    down: Record<number, string>;
  };
}
