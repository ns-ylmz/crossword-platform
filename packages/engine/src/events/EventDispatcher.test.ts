import type { IEvent } from '@crossword/core';
import { EventTypes } from '@crossword/core';
import { describe, it, expect, vi } from 'vitest';

import { EventDispatcher } from './EventDispatcher.js';

describe('EventDispatcher', () => {
  it('should allow subscribing to and receiving an event', () => {
    const dispatcher = new EventDispatcher();
    const handler = vi.fn();

    dispatcher.subscribe(EventTypes.GAME_STARTED, handler);

    const event: IEvent = {
      type: EventTypes.GAME_STARTED,
      payload: { gameId: 'g1', puzzleId: 'p1' },
      timestamp: Date.now(),
    };

    dispatcher.dispatch(event);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(event);
  });

  it('should not receive events after unsubscribing', () => {
    const dispatcher = new EventDispatcher();
    const handler = vi.fn();

    dispatcher.subscribe(EventTypes.GAME_STARTED, handler);
    dispatcher.unsubscribe(EventTypes.GAME_STARTED, handler);

    const event: IEvent = {
      type: EventTypes.GAME_STARTED,
      payload: { gameId: 'g1', puzzleId: 'p1' },
      timestamp: Date.now(),
    };

    dispatcher.dispatch(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should only dispatch to handlers of the matching event type', () => {
    const dispatcher = new EventDispatcher();
    const startHandler = vi.fn();
    const cellHandler = vi.fn();

    dispatcher.subscribe(EventTypes.GAME_STARTED, startHandler);
    dispatcher.subscribe(EventTypes.CELL_UPDATED, cellHandler);

    const event: IEvent = {
      type: EventTypes.GAME_STARTED,
      payload: { gameId: 'g1', puzzleId: 'p1' },
      timestamp: Date.now(),
    };

    dispatcher.dispatch(event);

    expect(startHandler).toHaveBeenCalledTimes(1);
    expect(cellHandler).not.toHaveBeenCalled();
  });
});
