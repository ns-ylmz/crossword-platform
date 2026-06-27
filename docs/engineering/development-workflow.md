# Development Workflow

This document defines the standard development workflow for the Crossword Platform.

The goal is to establish a consistent process for both human contributors and AI agents, ensuring that architectural decisions remain intentional, traceable, and maintainable over time.

---

## Development Philosophy

Development is driven by design rather than implementation.

Every significant change should begin with understanding the problem before introducing code.

Whenever practical, documentation should evolve before implementation.

---

## Feature Lifecycle

Every new feature should follow the same high-level workflow.

```
Idea
    │
    ▼
Discussion
    │
    ▼
Documentation
    │
    ▼
Architecture Decision (if required)
    │
    ▼
Repository Changes
    │
    ▼
Implementation
    │
    ▼
Testing
    │
    ▼
Review
```

Each stage should produce artifacts that justify moving to the next stage.

---

## Documentation First

Documentation is considered part of the implementation process.

New architectural ideas should be discussed and documented before code is introduced.

When documentation and implementation diverge, documentation should be updated as soon as possible.

---

## Incremental Development

Large changes should be decomposed into small, reviewable steps.

Each commit should represent a single logical change.

Development should favor continuous progress over large, infrequent deliveries.

---

## Architecture Decisions

Not every change requires an Architecture Decision Record (ADR).

An ADR should be created when a decision:

- Introduces a new architectural direction
- Changes an existing architectural principle
- Affects multiple packages
- Has long-term maintenance implications

Minor implementation details should not become ADRs.

---

## Implementation

Implementation should follow the architectural boundaries defined by the project documentation.

Code should emerge from documented decisions rather than redefine them.

When implementation reveals a better design, documentation should be updated accordingly.

For **Engine** and **Core** packages, contributors should prefer a **test-first** approach whenever practical.

---

## Testing

Testing is part of development rather than a separate phase.

Business logic should be validated independently from presentation layers whenever practical.

Tests should increase confidence without becoming tightly coupled to implementation details.

---

## Refactoring

Refactoring should preserve observable behavior.

Structural improvements should be introduced through small, focused changes.

Whenever possible, refactoring should be isolated from feature development.

---

## Code Reviews

Reviews should evaluate:

- Architectural consistency
- Domain correctness
- Simplicity
- Readability
- Maintainability

Feedback should improve the design rather than merely enforce style preferences.

---

## AI Collaboration

AI agents should participate as engineering collaborators rather than autonomous implementers.

Before generating code, AI agents should understand:

- Project goals
- Engineering principles
- System architecture
- Domain model
- Repository structure

Generated code should align with existing documentation instead of introducing conflicting approaches.

---

## Continuous Improvement

The development workflow is expected to evolve.

Process improvements should be introduced deliberately and documented when they become part of the project's standard practices.
