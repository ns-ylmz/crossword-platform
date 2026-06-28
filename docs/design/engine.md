# Engine Architecture & Design

This document details the core architecture, state management, and communication boundaries of the Crossword Engine.

As the platform grows, the architectural patterns defined here will guide the implementation and may eventually be split into dedicated design specifications.

---

## 1. State Management

The engine is an independent, isolated unit that operates as a **Stateful Instance**. 

It encapsulates the complete state of a game, manages its own lifecycle, and houses an internal event dispatcher.

```typescript
// Conceptual Boundary
const engine = new CrosswordEngine(config);
engine.start();
```

The Engine is entirely unconcerned with *how* or *where* it is executed. It has absolutely no knowledge of DOM elements, browser APIs, or network requests.

---

## 2. Communication Models

To guarantee loose coupling, the engine employs a strict CQRS-inspired communication pattern based on **Commands** and **Events**.

### Command Model (Input)
A **Command** is a request directed at the engine to perform an action or mutate state.
- Commands represent *intent*.
- Commands can be rejected if they violate domain rules or constraints.
- External consumers (UI, Plugins) interact with the engine exclusively by dispatching commands.

*Examples:* `StartGameCommand`, `PlaceWordCommand`, `RevealCellCommand`.

### Event Model (Output)
An **Event** is a notification emitted by the engine indicating that a domain action has completed.
- Events represent *history*.
- Events cannot be rejected (they describe something that has already happened).
- External consumers update their own visual or local state purely by reacting to these events.

*Examples:* `GameStarted`, `WordPlaced`, `MoveRejected`, `ScoreUpdated`.

---

## 3. Lifecycle

The Engine operates as a finite state machine. Its primary logical states include:

- **Idle:** The engine is instantiated but has no active puzzle data loaded.
- **Ready:** A puzzle has been loaded and initialized. The engine is awaiting the command to begin.
- **Playing:** The game is active, timers are running, and moves are being accepted.
- **Paused:** The game is temporarily halted. Mutations (moves) are rejected.
- **Completed:** The puzzle is solved. No further board mutations are permitted.

State transitions are triggered strictly by Commands and broadcast strictly via Events.

---

## 4. Extensibility

### Plugin System
The engine supports extensibility through an event-driven Plugin system, without exposing its internal execution pipeline or mutable state.
- **Hooks:** Plugins listen to public Domain Events emitted by the Engine.
- **Action:** If a Plugin needs to alter the game state (e.g., a "Hint Plugin" revealing a letter automatically), it dispatches a standard Command back into the engine, functioning exactly like a human user.

### Provider Model (Data Acquisition)
The engine does not hardcode data sources or network calls. When the engine requires external data (such as fetching a puzzle definition or verifying a word against a dictionary), it relies entirely on Interface-Driven Contracts.
- The `Core` layer defines strict TypeScript interfaces (e.g., `IPuzzleProvider`, `IDictionaryProvider`).
- The engine interacts with the outside world purely through these interfaces, ensuring total decoupling from the underlying implementation.
