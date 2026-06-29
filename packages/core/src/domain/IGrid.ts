import type { ICell } from './ICell.js';

/**
 * Represents the layout of the board.
 */
export interface IGrid {
  width: number;
  height: number;
  cells: ICell[][]; // 2D array representation (y, x)
}
