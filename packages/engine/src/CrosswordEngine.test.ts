import type { IPuzzle, IPuzzleProvider } from '@crossword/core';
import { CommandTypes } from '@crossword/core';
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
        grid: {
          width: 2,
          height: 1,
          cells: [
            [
              { x: 0, y: 0, isBlock: false, correctValue: 'H' },
              { x: 1, y: 0, isBlock: false, correctValue: 'I' },
            ],
          ],
        },
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

  it('should throw an error if updating a cell when the game is not playing', async () => {
    // Engine is 'Idle' by default
    await expect(
      engine.execute({
        type: CommandTypes.UPDATE_CELL,
        payload: { x: 0, y: 0, value: 'H' },
        timestamp: Date.now(),
      }),
    ).rejects.toThrow('Cannot update cell: Game is not in playing state.');
  });

  it('should successfully update a correct cell, dispatch EVENT_CELL_UPDATED with isCorrect: true', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: CommandTypes.START_GAME,
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_CELL_UPDATED', eventHandler);

    await engine.execute({
      type: CommandTypes.UPDATE_CELL,
      payload: { x: 0, y: 0, value: 'H' },
      timestamp: Date.now(),
    });

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'EVENT_CELL_UPDATED',
        payload: expect.objectContaining({
          x: 0,
          y: 0,
          value: 'H',
          isCorrect: true, // Should be true since 'H' is correct value
        }),
      }),
    );

    const game = engine.getGame();
    expect(game).not.toBeNull();
    // Verify grid mutation
    expect(game?.userAnswers['0,0']).toEqual({ value: 'H', isCorrect: true });
  });

  it('should update an incorrect cell, dispatch EVENT_CELL_UPDATED with isCorrect: false', async () => {
    engine.attachPuzzleProvider(mockPuzzleProvider);
    await engine.execute({
      type: CommandTypes.START_GAME,
      payload: { puzzleId: 'mock-puzzle-1' },
      timestamp: Date.now(),
    });

    const eventHandler = vi.fn();
    engine.events.subscribe('EVENT_CELL_UPDATED', eventHandler);

    await engine.execute({
      type: CommandTypes.UPDATE_CELL,
      payload: { x: 1, y: 0, value: 'Z' },
      timestamp: Date.now(),
    });

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'EVENT_CELL_UPDATED',
        payload: expect.objectContaining({
          x: 1,
          y: 0,
          value: 'Z',
          isCorrect: false, // Should be false since 'I' is correct value
        }),
      }),
    );

    const game = engine.getGame();
    expect(game).not.toBeNull();
    // Grid should still mutate
    expect(game?.userAnswers['1,0']).toEqual({ value: 'Z', isCorrect: false });
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

  it('should reject updating a cell if game is paused', async () => {
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
        type: 'COMMAND_UPDATE_CELL',
        payload: { x: 0, y: 0, value: 'H' },
        timestamp: Date.now(),
      }),
    ).rejects.toThrow('Cannot update cell: Game is not in playing state.');
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
