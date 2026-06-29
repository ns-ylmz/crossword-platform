import type {
  GameState,
  IPuzzleProvider,
  IDictionaryProvider,
  IGame,
  ICommand,
  StartGamePayload,
  PlaceWordPayload,
} from '@crossword/core';
import { EventDispatcher } from './events/EventDispatcher.js';

export class CrosswordEngine {
  private game: IGame | null = null;
  public readonly events = new EventDispatcher();

  private puzzleProvider?: IPuzzleProvider;
  private dictionaryProvider?: IDictionaryProvider;

  constructor() {}

  public attachPuzzleProvider(provider: IPuzzleProvider): void {
    this.puzzleProvider = provider;
  }

  public attachDictionaryProvider(provider: IDictionaryProvider): void {
    this.dictionaryProvider = provider;
  }

  public getState(): GameState {
    return this.game ? this.game.state : 'Idle';
  }

  public getGame(): IGame | null {
    return this.game;
  }

  /**
   * The single entry point for processing external intent.
   * Command payloads are cast safely as the Discriminated type has already been validated.
   */
  public async execute(command: ICommand): Promise<void> {
    switch (command.type) {
      case 'COMMAND_START_GAME':
        await this.handleStartGame(command.payload as StartGamePayload);
        break;
      case 'COMMAND_PLACE_WORD':
        this.handlePlaceWord(command.payload as PlaceWordPayload);
        break;
      default:
        throw new Error(`Unknown command type: ${(command as ICommand).type}`);
    }
  }

  private async handleStartGame(payload: StartGamePayload): Promise<void> {
    if (!this.puzzleProvider) {
      throw new Error('Cannot start game: No IPuzzleProvider attached.');
    }

    const puzzle = await this.puzzleProvider.getPuzzle(payload.puzzleId);

    this.game = {
      id: `game-${Date.now()}`,
      puzzle,
      state: 'Playing',
      timerMs: 0,
      score: 0,
      userAnswers: {},
    };

    this.events.dispatch({
      type: 'EVENT_GAME_STARTED',
      payload: { gameId: this.game.id, puzzleId: payload.puzzleId },
      timestamp: Date.now(),
    });
  }

  private handlePlaceWord(payload: PlaceWordPayload): void {
    if (!this.game || this.game.state !== 'Playing') {
      throw new Error('Cannot place word: Game is not in playing state.');
    }

    // We will implement actual grid validation in the future.
    // For now, blindly accept it and dispatch the event.

    this.events.dispatch({
      type: 'EVENT_WORD_PLACED',
      payload: {
        x: payload.x,
        y: payload.y,
        direction: payload.direction,
        word: payload.word,
        isCorrect: true, // Mock logic for now
      },
      timestamp: Date.now(),
    });
  }
}
