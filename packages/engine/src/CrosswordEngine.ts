import { CommandTypes, EventTypes } from '@crossword/core';
import type {
  GameState,
  ICommand,
  IDictionaryProvider,
  IGame,
  IPuzzleProvider,
} from '@crossword/core';

import { EventDispatcher } from './events/EventDispatcher.js';

export class CrosswordEngine {
  public readonly events = new EventDispatcher();

  private dictionaryProvider?: IDictionaryProvider;
  private game: IGame | null = null;
  private puzzleProvider?: IPuzzleProvider;

  constructor() {}

  public attachDictionaryProvider(provider: IDictionaryProvider): void {
    this.dictionaryProvider = provider;
  }

  public attachPuzzleProvider(provider: IPuzzleProvider): void {
    this.puzzleProvider = provider;
  }

  /**
   * The single entry point for processing external intent.
   * Command payloads are cast safely as the Discriminated type has already been validated.
   */
  public async execute(command: ICommand): Promise<void> {
    switch (command.type) {
      case CommandTypes.START_GAME:
        await this.handleStartGame(command.payload);
        break;
      case CommandTypes.PLACE_WORD:
        this.handlePlaceWord(command.payload);
        break;
      case CommandTypes.PAUSE_GAME:
        this.handlePauseGame();
        break;
      case CommandTypes.RESUME_GAME:
        this.handleResumeGame();
        break;
      case CommandTypes.FINISH_GAME:
        this.handleFinishGame();
        break;
      default:
        // By TypeScript's exhaustive check, we should never hit this if all types are handled,
        // but it's good practice for runtime safety.
        throw new Error(`Unknown command type: ${(command as ICommand).type}`);
    }
  }

  public getGame(): IGame | null {
    return this.game;
  }

  public getState(): GameState {
    return this.game ? this.game.state : 'Idle';
  }

  private async handleStartGame(
    payload: Extract<ICommand, { type: typeof CommandTypes.START_GAME }>['payload'],
  ): Promise<void> {
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
      type: EventTypes.GAME_STARTED,
      payload: { gameId: this.game.id, puzzleId: payload.puzzleId },
      timestamp: Date.now(),
    });
  }

  private handlePlaceWord(
    payload: Extract<ICommand, { type: typeof CommandTypes.PLACE_WORD }>['payload'],
  ): void {
    if (!this.game || this.game.state !== 'Playing') {
      throw new Error('Cannot place word: Game is not in playing state.');
    }

    const chars = payload.word.split('');
    let currentX = payload.x;
    let currentY = payload.y;

    for (let i = 0; i < chars.length; i++) {
      this.game.userAnswers[`${currentX},${currentY}`] = chars[i];
      if (payload.direction === 'across') {
        currentX++;
      } else {
        currentY++;
      }
    }

    this.events.dispatch({
      type: EventTypes.WORD_PLACED,
      payload: {
        x: payload.x,
        y: payload.y,
        direction: payload.direction,
        word: payload.word,
        isCorrect: true, // Validation will be handled in M2.3
      },
      timestamp: Date.now(),
    });
  }

  private handlePauseGame(): void {
    if (!this.game || this.game.state !== 'Playing') {
      throw new Error('Cannot pause: Game is not in playing state.');
    }
    this.game.state = 'Paused';
    this.events.dispatch({
      type: EventTypes.GAME_PAUSED,
      payload: {},
      timestamp: Date.now(),
    });
  }

  private handleResumeGame(): void {
    if (!this.game || this.game.state !== 'Paused') {
      throw new Error('Cannot resume: Game is not paused.');
    }
    this.game.state = 'Playing';
    this.events.dispatch({
      type: EventTypes.GAME_RESUMED,
      payload: {},
      timestamp: Date.now(),
    });
  }

  private handleFinishGame(): void {
    if (!this.game) {
      throw new Error('Cannot finish: No active game.');
    }
    this.game.state = 'Completed';
    this.events.dispatch({
      type: EventTypes.GAME_FINISHED,
      payload: {},
      timestamp: Date.now(),
    });
  }
}
