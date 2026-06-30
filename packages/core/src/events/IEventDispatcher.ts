import type { IEvent } from './IEvent.js';

export type EventHandler<TEvent extends IEvent = IEvent> = (event: TEvent) => void | Promise<void>;

export interface IEventDispatcher {
  dispatch(event: IEvent): void;

  subscribe<TType extends IEvent['type']>(
    eventType: TType,
    handler: EventHandler<Extract<IEvent, { type: TType }>>,
  ): void;

  unsubscribe<TType extends IEvent['type']>(
    eventType: TType,
    handler: EventHandler<Extract<IEvent, { type: TType }>>,
  ): void;
}
