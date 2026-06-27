# ADR-0003: Adopt a Modular Engine Architecture

- **Status:** Accepted
- **Date:** 2026-06-27

---

## Context

The crossword engine is responsible for executing business rules, maintaining game state, validating moves, generating puzzles, and calculating scores.

As the platform grows, the engine will need to support multiple variations of crossword games, integrate with external data providers, and allow custom plugins to modify default behaviors.

If all of these responsibilities were implemented within a single monolithic module or class, the engine would quickly become rigid, difficult to test, and impossible to extend without modifying core code.

A flexible internal architecture was required for the engine to support long-term maintainability and extensibility.

---

## Decision

The project adopts a modular architecture for the Crossword Engine.

The engine will be composed of independent, highly cohesive modules. Examples include:

- Puzzle Generator
- Move Validator
- Score Calculator
- Theme Provider
- Puzzle Serializer

Modules must remain independent and unaware of each other's implementations.

Key architectural constraints:

- **Single Responsibility:** Each module must focus on one specific aspect of the domain.
- **Contract-Based Communication:** Modules must not depend directly on each other's internal implementations. They must communicate through public contracts defined in the `Core` layer.
- **Event-Driven Coordination:** Modules may communicate through well-defined contracts.
- **Plugin-Ready:** The architecture must allow external modules (Plugins/Providers) to hook into the engine's lifecycle seamlessly.

---

## Consequences

### Positive

- High cohesion and low coupling within the engine.
- Individual modules can be tested in isolation (Test-Driven Development becomes easier).
- New features (e.g., a new scoring algorithm) can be added as new modules or plugins without altering existing code.
- Enforces strict adherence to the ubiquitous domain language through shared contracts.

### Negative

- Increased initial complexity due to the required abstractions.
- Event-driven communication can make debugging and tracing execution flows more difficult.
- Requires careful design of the `Core` contracts to prevent breaking changes.

---

## Alternatives Considered

### Monolithic Engine Class

All business logic could have been placed inside a single `Engine` class or a tightly coupled set of classes.

This approach was rejected because it would:

- violate the Single Responsibility Principle,
- make it impossible to introduce third-party plugins safely,
- lead to a "God object" anti-pattern over time,
- make unit testing extremely complex due to intertwined dependencies.

---

## References

- [PROJECT.md](../../PROJECT.md)
- [System Architecture](../system-architecture.md)
- [Engineering Principles](../engineering-principles.md)
- [Domain Model](../domain-model.md)
