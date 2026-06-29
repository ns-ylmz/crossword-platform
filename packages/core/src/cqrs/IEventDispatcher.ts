import type { IEvent } from './IEvent.js';

/**
 * Defines a handler function for an event.
 */
export type EventHandler<TEvent extends IEvent = IEvent> = (event: TEvent) => void | Promise<void>;

/**
 * Interface-driven contract for broadcasting and listening to Domain Events.
 */
export interface IEventDispatcher {
  /**
   * Broadcasts an event to all registered listeners.
   */
  dispatch(event: IEvent): void;

  /**
   * Subscribes a handler function to a specific event type.
   * Uses TypeScript 'Extract' to automatically infer the correct payload type based on the string type.
   */
  subscribe<TType extends IEvent['type']>(
    eventType: TType,
    handler: EventHandler<Extract<IEvent, { type: TType }>>,
  ): void;

  /**
   * Removes a previously subscribed handler.
   */
  unsubscribe<TType extends IEvent['type']>(
    eventType: TType,
    handler: EventHandler<Extract<IEvent, { type: TType }>>,
  ): void;
}
