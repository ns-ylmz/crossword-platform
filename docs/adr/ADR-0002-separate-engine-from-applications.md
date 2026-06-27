# ADR-0002: Separate Engine from Applications

- **Status:** Accepted
- **Date:** 2026-06-27

---

## Context

The Crossword Platform is intended to support multiple applications built on top of a shared crossword engine.

Potential consumers include:

- web applications,
- desktop applications,
- mobile applications,
- command-line tools,
- automated testing environments,
- future integrations that have not yet been identified.

Embedding application logic inside the engine would tightly couple the core domain to a specific runtime, making reuse significantly more difficult.

A clear architectural boundary was required between domain logic and application-specific concerns.

---

## Decision

The crossword engine shall remain completely independent of any application.

The engine is responsible only for domain behavior, business rules, and puzzle execution.

Applications are responsible for:

- rendering,
- user interaction,
- routing,
- persistence integration,
- platform-specific behavior.

Communication between applications and the engine occurs exclusively through the engine's public API and event system.

The engine must never depend on application code.

---

## Consequences

### Positive

- The engine becomes reusable across multiple platforms.
- Business rules remain centralized.
- Applications remain lightweight.
- UI technologies can evolve independently.
- Automated testing becomes significantly simpler.
- The engine can later be published as reusable packages.

### Negative

- More abstraction is required.
- Public APIs must be designed carefully.
- Initial architecture is more complex than embedding logic inside a single application.

---

## Alternatives Considered

### Embed Engine Logic Inside the Frontend

The crossword logic could have been implemented directly inside the frontend application.

This approach was rejected because it would:

- tightly couple domain logic to a single framework,
- reduce portability,
- complicate testing,
- make future reuse significantly more difficult.

---

## References

- [PROJECT.md](../../PROJECT.md)
- [System Architecture](../system-architecture.md)
- [Domain Model](../domain-model.md)
- [Repository Structure](../repository-structure.md)
