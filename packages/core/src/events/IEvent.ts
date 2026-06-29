// Strict, serializable JSON-compatible payload rules
export type EventPayloadValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | EventPayloadValue[]
  | { [key: string]: EventPayloadValue };

export type IEventPayload = Record<string, EventPayloadValue>;

// All possible event types
export type EventType = 'EVENT_GAME_STARTED' | 'EVENT_WORD_PLACED';

/**
 * Represents a historical fact; something that has already occurred.
 */
export interface IEvent<
  TType extends EventType = EventType,
  TPayload extends IEventPayload = IEventPayload,
> {
  type: TType;
  payload: TPayload;
  timestamp: number;
}
