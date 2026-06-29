import type {
  IEvent,
  EventType,
  IEventDispatcher,
  EventHandler,
  IEventPayload,
} from '@crossword/core';

export class EventDispatcher implements IEventDispatcher {
  // We use a generic Map, as the actual type safety is enforced by the subscribe/unsubscribe signatures
  private listeners: Map<string, Set<EventHandler<IEvent>>> = new Map();

  public dispatch(event: IEvent): void {
    const handlers = this.listeners.get(event.type);
    if (handlers) {
      handlers.forEach((handler) => {
        handler(event);
      });
    }
  }

  public subscribe<TType extends EventType, TPayload extends IEventPayload>(
    eventType: TType,
    handler: EventHandler<IEvent<TType, TPayload>>,
  ): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(handler as EventHandler<IEvent>);
  }

  public unsubscribe<TType extends EventType, TPayload extends IEventPayload>(
    eventType: TType,
    handler: EventHandler<IEvent<TType, TPayload>>,
  ): void {
    const handlers = this.listeners.get(eventType);
    if (handlers) {
      handlers.delete(handler as EventHandler<IEvent>);
      if (handlers.size === 0) {
        this.listeners.delete(eventType);
      }
    }
  }
}
