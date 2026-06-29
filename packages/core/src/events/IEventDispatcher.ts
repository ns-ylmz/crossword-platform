import type { IEvent, EventType, IEventPayload } from './IEvent.js';

export type EventHandler<TEvent extends IEvent = IEvent> = (event: TEvent) => void | Promise<void>;

export interface IEventDispatcher {
  dispatch(event: IEvent): void;

  subscribe<TType extends EventType, TPayload extends IEventPayload>(
    eventType: TType,
    handler: EventHandler<IEvent<TType, TPayload>>,
  ): void;

  unsubscribe<TType extends EventType, TPayload extends IEventPayload>(
    eventType: TType,
    handler: EventHandler<IEvent<TType, TPayload>>,
  ): void;
}
