# ADR-0004: Adopt an Event-Driven Architecture

- **Status:** Accepted
- **Date:** 2026-06-27

---

## Context

The Crossword Platform consists of an independent `Engine`, external `Providers`, extensibility `Plugins`, and multiple `Applications` (UI).

If the Engine were to notify the UI about state changes (e.g., a move was validated, the score changed, or the puzzle was completed) by calling direct methods or specific callbacks, the Engine would become tightly coupled to the implementation details of the Application layer.

Furthermore, internal modules within the Engine (like the Score Calculator or Puzzle Serializer) and external Plugins need to react to actions occurring elsewhere in the system without creating hard dependencies.

A communication strategy was required that guarantees the Engine remains completely unaware of its consumers while allowing those consumers to react instantly to domain state changes.

---

## Decision

The project adopts an Event-Driven Architecture (EDA) for inter-module and cross-boundary communication.

The `Engine` emits strictly typed domain events representing completed business actions.

Events are notifications of completed domain actions, not commands requesting work to be performed.

Commands initiate work. Events describe work that has already happened.

Examples of domain events include:

- `PuzzleGenerated`
- `MoveValidated`
- `MoveRejected`
- `ScoreUpdated`
- `GameCompleted`

Applications, Plugins, and internal Engine modules may subscribe to domain events when loose coupling or asynchronous coordination is preferred.

Direct interactions between modules should continue to occur through well-defined contracts exposed by the Core layer.

All event definitions and the event bus/dispatcher contracts will be maintained in the `Core` layer to ensure they remain universally accessible and framework-agnostic.

---

## Consequences

### Positive

- **Total Decoupling:** The Engine has absolutely no knowledge of the UI, DOM, or external subscribers.
- **Extensibility:** Plugins can easily hook into the lifecycle by listening to domain events.
- **Advanced Features:** Enables trivial implementation of features like Undo/Redo, activity logging, and replays by simply recording the event stream.
- **Future-Proofing:** Enables future distributed and real-time integrations without introducing additional coupling.

### Negative

- **Tracing Difficulty:** Execution flows are no longer linear, which can make debugging harder.
- **Complexity:** Requires building or integrating a robust, strictly typed event dispatcher in the `Core` layer.
- **State Synchronization:** The UI must be carefully designed to synchronize its state purely based on incoming events.

---

## Alternatives Considered

### Direct Callbacks (Observer Pattern)

The Engine could accept callback functions from the UI (e.g., `onMoveValidated(callback)`).

This approach was rejected because:

- it creates tighter coupling between the UI and Engine lifecycles,
- it becomes cumbersome to manage when dealing with dozens of different actions,
- it scales poorly when multiple distinct subsystems (e.g., UI, Analytics Plugin, Storage Plugin) need to listen to the same action simultaneously.

### State Polling

The UI could periodically check the Engine's state to see if anything changed.

This approach was rejected due to obvious performance drawbacks, latency, and the inability to reliably detect rapid sequential changes.

---

## References

- [PROJECT.md](../../PROJECT.md)
- [Engineering Principles](../engineering/engineering-principles.md)
- [System Architecture](../architecture/system-architecture.md)
- [ADR-0002: Separate Engine from Applications](ADR-0002-separate-engine-from-applications.md)
- [ADR-0003: Adopt a Modular Engine Architecture](ADR-0003-adopt-modular-engine-architecture.md)
