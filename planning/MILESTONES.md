# Milestones

This document breaks down the active phases defined in the `ROADMAP.md` into actionable milestones.

---

## Phase 0: Infrastructure & Tooling

### M0.1: Workspace Initialization

- Initialize `pnpm` workspace in the repository root.
- Set up `pnpm-workspace.yaml`.
- Configure shared `tsconfig.base.json`.
- Configure repository-wide ESLint and Prettier.
- Configure Vitest for TDD.

### M0.2: Package Scaffolding

- Create the `packages/core` package (empty shell).
- Create the `packages/engine` package (empty shell).
- Configure internal dependency linking (Engine depends on Core).

---

## Phase 1: Contracts & Domain

### M1.1: Core Domain Types

- Define `Cell`, `Grid`, `Word`, and `Clue` interfaces in `packages/core`.
- Define `Puzzle` and `Game` aggregate interfaces.

### M1.2: Event & Command Contracts

- Define the base `ICommand` interface.
- Define the base `IEvent` interface.
- Define the `IEventDispatcher` contract.

---

## Phase 2: Engine Internals

### M2.1: Engine Base & Event Dispatcher

- Implement `EventDispatcher` class.
- Implement the base `CrosswordEngine` class with state transition logic.
- Implement `execute(command)` for `StartGameCommand`.

### M2.2: State Machine Expansion & Grid Operations

- Add `Paused` and `Completed` states to the Engine.
- Introduce `COMMAND_PAUSE_GAME`, `COMMAND_RESUME_GAME`, `COMMAND_FINISH_GAME`.
- Implement grid mutation logic inside `COMMAND_PLACE_WORD`.
- Write unit tests using Vitest to enforce state transitions.

---

_(Subsequent milestones for Phase 2 and beyond will be added as we progress.)_
