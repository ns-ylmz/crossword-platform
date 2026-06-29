/**
 * Represents a single square on the board (Static/Immutable).
 */
export interface ICell {
  x: number;
  y: number;
  isBlock: boolean; // true if it's a black square
  correctValue?: string; // The correct letter (static puzzle data)
  number?: number; // The number printed in the cell (e.g., 1 for "1 Across")
}
