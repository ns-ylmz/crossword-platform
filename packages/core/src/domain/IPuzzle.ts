import type { IGrid } from './IGrid.js';
import type { IClue } from './IClue.js';

/**
 * Represents the structural definition of a crossword puzzle (Static Data).
 */
export interface IPuzzle {
  id: string;
  title?: string;
  author?: string;
  grid: IGrid; // The static layout with correctValues
  clues: {
    across: IClue[];
    down: IClue[];
  };
}
