import type { IEvent } from '@crossword/core';
import { describe, it, expect, vi } from 'vitest';

import { EventDispatcher } from './EventDispatcher.js';

describe('EventDispatcher', () => {
  it('should allow subscribing to and receiving an event', () => {
    const dispatcher = new EventDispatcher();
    const handler = vi.fn();

    dispatcher.subscribe('EVENT_GAME_STARTED', handler);

    const event = {
      type: 'EVENT_GAME_STARTED',
      payload: { gameId: 'g1', puzzleId: 'p1' },
      timestamp: Date.now(),
    } as unknown as IEvent;

    dispatcher.dispatch(event);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(event);
  });

  it('should not receive events after unsubscribing', () => {
    const dispatcher = new EventDispatcher();
    const handler = vi.fn();

    dispatcher.subscribe('EVENT_GAME_STARTED', handler);
    dispatcher.unsubscribe('EVENT_GAME_STARTED', handler);

    const event = {
      type: 'EVENT_GAME_STARTED',
      payload: { gameId: 'g1', puzzleId: 'p1' },
      timestamp: Date.now(),
    } as unknown as IEvent;

    dispatcher.dispatch(event);

    expect(handler).not.toHaveBeenCalled();
  });


  it('should only dispatch to handlers of the matching event type', () => {
    const dispatcher = new EventDispatcher();
    const startHandler = vi.fn();
    const placeHandler = vi.fn();

    dispatcher.subscribe('EVENT_GAME_STARTED', startHandler);
    dispatcher.subscribe('EVENT_WORD_PLACED', placeHandler);

    const event = {
      type: 'EVENT_GAME_STARTED',
      payload: { gameId: 'g1', puzzleId: 'p1' },
      timestamp: Date.now(),
    } as unknown as IEvent;

    dispatcher.dispatch(event);

    expect(startHandler).toHaveBeenCalledTimes(1);
    expect(placeHandler).not.toHaveBeenCalled();
  });
});
