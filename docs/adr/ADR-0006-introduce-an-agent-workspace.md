# ADR-0006: Introduce an Agent Workspace

- **Status:** Accepted
- **Date:** 2026-06-27

---

## Context

The Crossword Platform is intended to support both human contributors and AI-assisted development throughout its lifecycle.

AI agents are powerful, but they require strict context, clear boundaries, and definitive rules to operate safely without introducing technical debt, making unsupported architectural assumptions, or breaking core constraints.

If AI agents are simply pointed at a repository without a deterministic bootstrapping process, they will often guess the architecture based on common patterns or search the entire codebase blindly, leading to inconsistent and error-prone implementations.

A dedicated mechanism was required to safely onboard AI agents into the project and explicitly define how they should interact with the established source of truth.

---

## Decision

The project introduces an **Agent Workspace** located in the `.ai/` directory.

The Agent Workspace serves as the mandatory entry point and bootstrapping environment for all AI agents interacting with the repository.

The Agent Workspace defines how AI agents discover and consume project knowledge.

It does not replace, duplicate, or extend the project's technical documentation.

The `docs/` directory remains the authoritative source of project knowledge, while the Agent Workspace standardizes how that knowledge is consumed by AI agents.

The Agent Workspace establishes a standardized onboarding process for AI agents.

- It provides a canonical bootstrapping process that establishes the reading order and initialization sequence for AI agents.
- It acts solely as an instruction set (prompts) detailing _how_ an agent should consume the project's knowledge.
- It must **never** duplicate architectural knowledge, domain logic, or engineering principles. The `docs/` directory remains the absolute single source of truth for all technical information.
- All AI agents must be directed to read `.ai/context.md` before making any codebase modifications.

---

## Consequences

### Positive

- **Deterministic Bootstrapping:** AI agents start with the exact same architectural context every time they are invoked.
- **Reduced Incorrect Assumptions:** By strictly guiding agents to read the `docs/` folder, the likelihood of them inventing incorrect solutions is significantly reduced.
- **Separation of Concerns:** Human-readable technical documentation (`docs/`) remains clean and free of AI-specific behavioral commands and prompts.
- **Safety:** Project-specific agent constraints and the standardized bootstrapping process help protect the architecture from unintended violations.

### Negative

- **Maintenance Overhead:** The `context.md` file and other AI-specific instructions must be kept in sync if the structure of the `docs/` directory changes.

---

## Alternatives Considered

### Embedding AI Instructions Inside Documentation

AI-specific prompts and instructions could have been embedded directly within the files inside the `docs/` directory or the root `README.md`.

This approach was rejected because:

- it pollutes clean technical documentation with machine-specific behavioral commands,
- it confuses human readers who do not need to read AI instructions,
- it fails to provide a single, deterministic entry point for the AI to bootstrap its initial context.

---

## References

- [PROJECT.md](../../PROJECT.md)
- [AI Workspace](../../.ai/README.md)
- [AI Context](../../.ai/context.md)
- [Repository Structure](../repository-structure.md)
- [ADR-0005: Adopt Documentation-First Development](ADR-0005-adopt-documentation-first-development.md)
