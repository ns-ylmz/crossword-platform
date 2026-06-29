import type { IPuzzle, IPuzzleProvider } from '@crossword/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { CrosswordEngine } from './CrosswordEngine.js';

describe('CrosswordEngine', () => {
  let engine: CrosswordEngine;
  let mockPuzzleProvider: IPuzzleProvider;

  beforeEach(() => {
    engine = new CrosswordEngine();

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
      })
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
      })
    );
  });

  it('should throw an error if placing a word when the game is not playing', async () => {
    // Engine is 'Idle' by default
    await expect(
      engine.execute({
        type: 'COMMAND_PLACE_WORD',
        payload: { x: 0, y: 0, direction: 'across', word: 'HELLO' },
        timestamp: Date.now(),
      })
    ).rejects.toThrow('Cannot place word: Game is not in playing state.');
  });

  it('should successfully place a word and dispatch EVENT_WORD_PLACED', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: 'COMMAND_START_GAME',
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_WORD_PLACED', eventHandler);

    await engine.execute({
      type: 'COMMAND_PLACE_WORD',
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
        }),
      })
    );
  });
});
