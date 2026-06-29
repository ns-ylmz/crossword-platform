import type { IPuzzle } from '../domain/IPuzzle.js';

/**
 * Interface-driven contract for acquiring puzzle data.
 * The Engine relies on this to fetch puzzles regardless of the underlying source (Supabase, API, Memory, File).
 */
export interface IPuzzleProvider {
  /**
   * Fetches a puzzle definition by its unique identifier.
   */
  getPuzzle(id: string): Promise<IPuzzle>;
}
