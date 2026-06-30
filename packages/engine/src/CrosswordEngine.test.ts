import type { IDictionaryProvider, IPuzzle, IPuzzleProvider } from '@crossword/core';
import { CommandTypes } from '@crossword/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { CrosswordEngine } from './CrosswordEngine.js';

describe('CrosswordEngine', () => {
  let engine: CrosswordEngine;
  let mockPuzzleProvider: IPuzzleProvider;

  const mockDictionaryProvider: IDictionaryProvider = {
    isValidWord: vi.fn(async (word: string) => {
      // For testing, let's say "WORLD" is correct, "WRONG" is incorrect.
      return word === 'WORLD';
    }),
  };

  beforeEach(() => {
    engine = new CrosswordEngine();
    engine.attachDictionaryProvider(mockDictionaryProvider);

    mockPuzzleProvider = {
      getPuzzle: vi.fn().mockResolvedValue({
        id: 'mock-puzzle-1',
        title: 'Test Puzzle',
        author: 'AI Agent',
        createdAt: Date.now(),
        grid: { width: 10, height: 10, cells: [] },
        clues: { across: [], down: [] },
      } as unknown as IPuzzle),
    };
  });

  it('should start in the Idle state', () => {
    expect(engine.getState()).toBe('Idle');
    expect(engine.getGame()).toBeNull();
  });

  it('should throw an error if starting game without a puzzle provider', async () => {
    await expect(
      engine.execute({
        type: 'COMMAND_START_GAME',
        payload: { puzzleId: 'mock-puzzle-1' },
        timestamp: Date.now(),
      }),
    ).rejects.toThrow('Cannot start game: No IPuzzleProvider attached.');
  });

  it('should successfully start a game and dispatch EVENT_GAME_STARTED', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_GAME_STARTED', eventHandler);

    await engine.execute({
      type: 'COMMAND_START_GAME',
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    expect(engine.getState()).toBe('Playing');
    expect(engine.getGame()).not.toBeNull();
    expect(engine.getGame()?.puzzle.id).toBe('mock-puzzle-1');

    expect(mockPuzzleProvider.getPuzzle).toHaveBeenCalledWith('mock-puzzle-1');

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'EVENT_GAME_STARTED',
        payload: expect.objectContaining({
          puzzleId: 'mock-puzzle-1',
        }),
      }),
    );
  });

  it('should throw an error if placing a word when the game is not playing', async () => {
    // Engine is 'Idle' by default
    await expect(
      engine.execute({
        type: 'COMMAND_PLACE_WORD',
        payload: { x: 0, y: 0, direction: 'across', word: 'HELLO' },
        timestamp: Date.now(),
      }),
    ).rejects.toThrow('Cannot place word: Game is not in playing state.');
  });

  it('should successfully place a correct word, dispatch EVENT_WORD_PLACED with isCorrect: true, and update score', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: CommandTypes.START_GAME,
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_WORD_PLACED', eventHandler);

    await engine.execute({
      type: CommandTypes.PLACE_WORD,
      payload: { x: 2, y: 3, direction: 'down', word: 'WORLD' },
      timestamp: Date.now(),
    });

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'EVENT_WORD_PLACED',
        payload: expect.objectContaining({
          x: 2,
          y: 3,
          direction: 'down',
          word: 'WORLD',
          isCorrect: true, // Should be true since 'WORLD' is mocked as valid
        }),
      }),
    );

    const game = engine.getGame();
    expect(game).not.toBeNull();
    // Verify grid mutation
    expect(game?.userAnswers['2,3']).toBe('W');
    // Verify scoring (10 points per letter, word is 5 letters -> 50 points)
    expect(game?.score).toBe(50);
  });

  it('should place an incorrect word, dispatch EVENT_WORD_PLACED with isCorrect: false, and NOT update score', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: CommandTypes.START_GAME,
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_WORD_PLACED', eventHandler);

    await engine.execute({
      type: CommandTypes.PLACE_WORD,
      payload: { x: 0, y: 0, direction: 'across', word: 'WRONG' },
      timestamp: Date.now(),
    });

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'EVENT_WORD_PLACED',
        payload: expect.objectContaining({
          x: 0,
          y: 0,
          direction: 'across',
          word: 'WRONG',
          isCorrect: false, // Should be false since 'WRONG' is mocked as invalid
        }),
      }),
    );

    const game = engine.getGame();
    expect(game).not.toBeNull();
    // Grid should still mutate
    expect(game?.userAnswers['0,0']).toBe('W');
    expect(game?.userAnswers['1,0']).toBe('R');
    // Score should remain 0
    expect(game?.score).toBe(0);
  });

  it('should pause the game successfully if playing', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: 'COMMAND_START_GAME',
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_GAME_PAUSED', eventHandler);

    await engine.execute({
      type: 'COMMAND_PAUSE_GAME',
      payload: {},
      timestamp: Date.now(),
    });

    expect(engine.getState()).toBe('Paused');
    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it('should reject placing a word if game is paused', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: 'COMMAND_START_GAME',
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    await engine.execute({
      type: 'COMMAND_PAUSE_GAME',
      payload: {},
      timestamp: Date.now(),
    });

    await expect(
      engine.execute({
        type: 'COMMAND_PLACE_WORD',
        payload: { x: 2, y: 3, direction: 'down', word: 'WORLD' },
        timestamp: Date.now(),
      }),
    ).rejects.toThrow('Cannot place word: Game is not in playing state.');
  });

  it('should resume the game successfully if paused', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: 'COMMAND_START_GAME',
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    await engine.execute({
      type: 'COMMAND_PAUSE_GAME',
      payload: {},
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_GAME_RESUMED', eventHandler);

    await engine.execute({
      type: 'COMMAND_RESUME_GAME',
      payload: {},
      timestamp: Date.now(),
    });

    expect(engine.getState()).toBe('Playing');
    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it('should finish the game successfully', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: 'COMMAND_START_GAME',
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_GAME_FINISHED', eventHandler);

    await engine.execute({
      type: 'COMMAND_FINISH_GAME',
      payload: {},
      timestamp: Date.now(),
    });

    expect(engine.getState()).toBe('Completed');
    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
