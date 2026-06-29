# Project Roadmap

The Crossword Platform is being developed in distinct, iterative phases.

This roadmap follows an "Agentic Development" philosophy: **Skeleton first, logic later.** We prioritize establishing rigid contracts and boundaries before writing any complex business logic.

---

## Phase 0: Infrastructure & Tooling

_Focus: Setting up the environment._

Before any code is written, the repository must be configured to support a modern, strictly typed monorepo environment.

- Monorepo package manager (pnpm).
- TypeScript configuration.
- Formatting and Linting (Prettier, ESLint).
- Testing Framework (Vitest).

## Phase 1: Contracts & Domain (The Skeleton)

_Focus: Setting the rules of the game._

Agents and developers require strict boundaries. In this phase, we define the TypeScript interfaces that govern the entire platform.

- Define `packages/core`.
- Write strict TypeScript interfaces for `Puzzle`, `Grid`, `Cell`, `Command`, and `Event`.
- No business logic is written here, only shapes and types.

## Phase 2: Engine Internals (The Heartbeat)

_Focus: Making the skeleton move._

With contracts in place, we implement the state machine and event dispatcher.

- Define `packages/engine`.
- Implement a basic state machine (Idle -> Ready -> Playing).
- Implement basic Command handlers and Event dispatchers.
- Business logic (validation, scoring) remains extremely simple or mocked.

## Phase 3: Extensibility & UI (The External World)

_Focus: Connecting to the outside world._

The engine is connected to real-world applications and plugins.

- Implement the Plugin System (e.g., Timer Plugin).
- Build the CLI reference application (headless).
- Build the Vue.js reference web application.
- Implement real Providers (Local JSON files, APIs).
