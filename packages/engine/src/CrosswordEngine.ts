import type { GameState, IPuzzleProvider, IDictionaryProvider } from '@crossword/core';

export class CrosswordEngine {
  private state: GameState = 'Idle';
  private puzzleProvider?: IPuzzleProvider;
  private dictionaryProvider?: IDictionaryProvider;

  constructor() {
    // Engine is instantiated in an Idle state
  }

  /**
   * Attaches a puzzle provider to the engine.
   * This respects the Dependency Inversion principle, as the Engine only knows about the IPuzzleProvider interface.
   */
  public attachPuzzleProvider(provider: IPuzzleProvider): void {
    this.puzzleProvider = provider;
  }

  /**
   * Attaches a dictionary provider to the engine for word validation.
   */
  public attachDictionaryProvider(provider: IDictionaryProvider): void {
    this.dictionaryProvider = provider;
  }

  public getState(): GameState {
    return this.state;
  }
}
