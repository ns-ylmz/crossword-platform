# Project Backlog

This document contains the granular execution checklist for the active milestones.

**Status Legend:**

- `[ ]` Not Started
- `[/]` In Progress
- `[x]` Completed

> [!IMPORTANT]  
> AI Agents: You must follow the Pull Request workflow defined in `planning/README.md` when picking up tasks from this backlog.

---

## M0.1: Workspace Initialization

- `[x]` Initialize `pnpm` workspace (create `package.json` in root).
- `[x]` Create `pnpm-workspace.yaml` and configure `packages/*` and `apps/*`.
- `[x]` Set up generic `tsconfig.base.json` at the root.
- `[x]` Install and configure ESLint for the workspace.
- `[x]` Install and configure Prettier for the workspace.
- `[x]` Install and configure Vitest for the workspace.

## M0.2: Package Scaffolding

- `[x]` Scaffold `packages/core` (Types and interfaces).
- `[x]` Scaffold `packages/engine` (Core logic, implementing Core interfaces).

## M1.1: Core Domain Types

- `[/]` Define `Cell`, `Grid`, `Word`, and `Clue` interfaces in `packages/core`.
- `[/]` Define `Puzzle` and `Game` aggregate interfaces in `packages/core`.

## M1.2: Event & Command Contracts

- `[x]` Define the base `ICommand` interface.
- `[x]` Define the base `IEvent` interface.
- `[x]` Define the `IEventDispatcher` contract.

## Phase 2: Engine Internals

### M2.1: Engine Base & Event Dispatcher

- `[x]` Implement `EventDispatcher.ts`.
- `[x]` Implement `CrosswordEngine.ts` base logic.
- `[x]` Implement `execute(command)` mechanism.
- `[x]` Write Unit Tests for Engine Base.

### M2.2: State Machine Expansion & Grid Operations

- `[/]` Update `ICommand` and `IEvent` contracts.
- `[ ]` Extend `GameState` to handle `Paused` and `Completed`.
- `[ ]` Write TDD tests for new commands (`Pause`, `Resume`, `Finish`).
- `[ ]` Write TDD tests for Grid mutation on `PlaceWord`.
- `[ ]` Implement Engine transition logic to pass tests.
