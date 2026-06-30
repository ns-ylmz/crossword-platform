/**
 * The fundamental message structure for all Commands and Events in the Crossword Platform.
 *
 * @typeParam TType The unique string literal representing the message type.
 * @typeParam TPayload The strictly typed payload associated with this message.
 */
export interface IMessage<TType extends string, TPayload> {
  type: TType;
  payload: TPayload;
  timestamp: number;
}
