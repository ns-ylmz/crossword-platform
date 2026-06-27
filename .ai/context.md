# Project Context

This document is the primary entry point for AI agents contributing to the Crossword Platform.

Its purpose is not to describe the project itself, but to define how an AI agent should acquire the project's context before making architectural or implementation decisions.

The project documentation remains the single source of truth.

---

## Purpose

Before contributing to the project, every AI agent should establish a complete understanding of:

- the project vision,
- engineering principles,
- architecture,
- domain model,
- repository organization,
- development workflow,
- engineering standards.

This document defines the recommended order for acquiring that understanding.

---

## Bootstrap Process

Every contribution should begin with the following process.

```text
Read Context
        │
        ▼
Understand Project
        │
        ▼
Understand Architecture
        │
        ▼
Understand Development Standards
        │
        ▼
Plan Changes
        │
        ▼
Implement
        │
        ▼
Validate
```

No implementation should begin before the project context has been established.

---

## Reading Order

AI agents should read the project documentation in the following order.

### Project Foundation

1. [PROJECT.md](../PROJECT.md)
2. [AGENTS.md](../AGENTS.md)

---

### Engineering Foundation

3. [Engineering Principles](../docs/engineering/engineering-principles.md)
4. [System Architecture](../docs/architecture/system-architecture.md)
5. [Domain Model](../docs/architecture/domain-model.md)

---

### Repository

6. [Repository Structure](../docs/architecture/repository-structure.md)

---

### Development Process

7. [Development Workflow](../docs/engineering/development-workflow.md)
8. [Testing Strategy](../docs/engineering/testing-strategy.md)

---

### Engineering Standards

9. [ADR Guidelines](../docs/engineering/adr-guidelines.md)
10. [Commit Conventions](../docs/engineering/commit-conventions.md)
11. [Branching Strategy](../docs/engineering/branching-strategy.md)
12. [Pull Request Workflow](../docs/engineering/pull-request-workflow.md)
13. [Release Process](../docs/engineering/release-process.md)

Documentation should always be consulted before implementation.

---

## Working Principles

After the project context has been established, AI agents should:

- preserve architectural consistency,
- respect documented engineering principles,
- avoid introducing undocumented architectural changes,
- keep documentation synchronized with implementation,
- propose ADRs when significant architectural decisions are introduced.

Project documentation always takes precedence over assumptions.

---

## Completion Criteria

An AI agent is considered ready to contribute when it can:

- explain the project's architecture,
- identify the responsibility of each layer,
- understand the domain terminology,
- follow the documented development workflow,
- apply repository standards consistently.

Implementation should begin only after these conditions have been satisfied.

---

## Continuous Evolution

This document should remain lightweight.

As the project evolves, this document should continue to reference project documentation rather than duplicate it.

The goal is to provide a stable and reusable bootstrap process for any AI agent contributing to the repository.
