# AGENTS.md

## Purpose

This repository contains the source code and documentation for the Crossword Platform.

The long-term goal of this project is to build a framework-agnostic crossword platform where the engine is completely independent from any UI technology.

The Vue application is only a reference implementation used to demonstrate the engine.

---

# Engineering Principles

These principles are non-negotiable.

- The Engine is the product.
- UI is only a presentation layer.
- The Engine must remain framework agnostic.
- The Engine must never depend on browser APIs or the DOM.
- Every architectural decision should prioritize reusability.
- Favor composition over inheritance.
- Prefer pure functions whenever possible.
- Business rules belong inside the Engine, never inside the UI.
- Public APIs are more important than internal implementations.

---

# Architecture Rules

Every module must have a single responsibility.

Modules must never depend directly on each other.

All communication between modules must happen through contracts defined by the Core package.

Dependencies must always point toward the Core.

```
Application
        ↓
Engine Modules
        ↓
Core
```

No circular dependencies are allowed.

---

# Domain Driven Design

The project follows Domain-Driven Design principles.

Use the domain language consistently.

Examples include:

- Puzzle
- Game
- Grid
- Cell
- Word
- Clue
- Move
- Position
- Direction
- Provider
- Plugin

Do not introduce alternative names for existing domain concepts.

---

# Event-Driven Architecture

Modules communicate using events.

Do not call another module directly if an event can be used instead.

Events are part of the public architecture.

---

# Plugin First

The architecture must remain extensible.

Even if plugins are not implemented yet, every major subsystem should be designed with extension points in mind.

Avoid implementations that make future plugins impossible.

---

# Provider Abstraction

The Engine must never know where data comes from.

External data is always accessed through Providers.

Possible providers include:

- JSON
- API
- AI
- Local Storage
- Memory

The Engine only depends on provider contracts.

---

# UI Integration

The UI is intentionally "dumb".

Responsibilities of the UI:

- Render state
- Dispatch user actions
- Subscribe to engine events

Responsibilities of the Engine:

- Game logic
- Validation
- Generation
- Scoring
- State transitions
- Event emission

---

# Documentation First

Every significant architectural change must be documented before implementation.

The preferred workflow is:

Discussion

↓

Decision

↓

Documentation

↓

Implementation

↓

Tests

---

# Things You Must Never Do

Never import UI frameworks into Engine packages.

Never access the DOM inside the Engine.

Never bypass Core contracts.

Never couple Providers to the Engine implementation.

Never introduce circular dependencies.

Never move business logic into UI components.

Never break the ubiquitous language.

---

# Long-Term Vision

The platform should be reusable in:

- Browser
- Node.js
- Bun
- Deno
- React
- Vue
- Angular
- Svelte
- CLI applications
- Future UI frameworks

The Engine should remain portable across all supported environments.
