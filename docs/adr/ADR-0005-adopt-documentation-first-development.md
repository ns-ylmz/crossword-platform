# ADR-0005: Adopt Documentation-First Development

- **Status:** Accepted
- **Date:** 2026-06-27

---

## Context

The Crossword Platform is designed as a long-term engineering project composed of multiple independent packages, a reusable engine, and comprehensive project documentation.

The project is intended to be developed collaboratively by both human developers and AI agents over an extended period.

Maintaining architectural consistency, preserving design intent, and providing an authoritative source of truth are therefore essential.

A development methodology was required to ensure that architectural decisions and domain knowledge are established before implementation begins.

---

## Decision

The project adopts a strict **Documentation-First Development** methodology.

Documentation defines the intended architecture.

Implementation fulfills that documented architecture.

Code is the consequence of documented decisions, never the definition of them.

The software development lifecycle must follow this sequence:

1. **Discussion**
2. **Decision** (via Architecture Decision Records when applicable)
3. **Documentation** (Updating the `docs/` knowledge base)
4. **Implementation** (Writing the code)
5. **Verification**

Before implementing any significant architectural or domain change, the relevant documentation must be updated and reviewed.

Implementation follows the approved documentation.

Documentation is the primary source of architectural truth.

The source code is its implementation.

---

## Consequences

### Positive

- **Architectural Integrity:** Code is written with clear intent and boundaries.
- **AI Agent Enablement:** AI agents can reliably bootstrap their context from the `docs/` directory without hallucinating or making incorrect assumptions.
- **Traceability:** Every major change is recorded in history (via ADRs), explaining _why_ the code looks the way it does.
- **Onboarding:** New contributors can understand the entire system without having to read the source code first.

### Negative

- **Slower Initial Velocity:** Requires discipline and time to write documentation before writing code, which can feel restrictive for trivial changes.
- **Maintenance Overhead:** The documentation must be rigorously maintained and synchronized with the codebase to prevent it from becoming stale.

---

## Alternatives Considered

### Code-First Development

The traditional approach where developers write the code to solve the problem and document it later (if time permits).

This approach was rejected because:

- it inevitably leads to technical debt and architectural drift,
- it destroys the "Single Source of Truth" necessary for AI agents to function autonomously and accurately,
- it relies on implicit knowledge that is easily lost when contributors leave the project.

---

## References

- [PROJECT.md](../../PROJECT.md)
- [Engineering Principles](../engineering/engineering-principles.md)
- [Development Workflow](../engineering/development-workflow.md)
- [ADR-0003: Adopt a Modular Engine Architecture](ADR-0003-adopt-modular-engine-architecture.md)
- [ADR-0004: Adopt an Event-Driven Architecture](ADR-0004-adopt-an-event-driven-architecture.md)
