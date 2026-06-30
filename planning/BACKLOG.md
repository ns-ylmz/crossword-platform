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

- `[x]` Update `ICommand` and `IEvent` contracts.
- `[x]` Extend `GameState` to handle `Paused` and `Completed`.
- `[x]` Write TDD tests for new commands (`Pause`, `Resume`, `Finish`).
- `[x]` Write TDD tests for Grid mutation on `PlaceWord`.
- `[x]` Implement Engine transition logic to pass tests.
- `[x]` Refactor into strictly typed `IMessage` messaging infrastructure.

### M2.3: Word Validation & Scoring

- `[x]` Integrate `IDictionaryProvider` into `handlePlaceWord` to validate inputs.
- `[x]` Update `Game.score` based on correct/incorrect placements.
- `[x]` Write TDD tests using a mock dictionary provider.

## Phase 3: Extensibility & UI

### M3.1: Vue Web Application

- `[x]` Scaffold Vue 3 + Vite + TS app in `apps/web`.
- `[x]` Connect Engine and Core packages.
- `[x]` Build Premium Dark Mode aesthetics.
- `[x]` Implement local mock providers (`LocalPuzzleProvider`, `MockDictionaryProvider`).
- `[x]` Build UI components (`CrosswordGrid.vue`) and bind Engine state.

### M3.2: Grid Interaction & Instant Feedback

- `[/]` Claim M3.2 in `BACKLOG.md` and `MILESTONES.md` and create feature branch.
- `[ ]` Remove `IDictionaryProvider` and `score` from `@crossword/core`.
- `[ ]` Update Messaging Contracts (`UPDATE_CELL`, `CELL_UPDATED`).
- `[ ]` Update `IGame.userAnswers` to track `{ value, isCorrect }`.
- `[ ]` Refactor `CrosswordEngine` and tests for cell-by-cell interactions.
- `[ ]` Update `CrosswordGrid.vue` for keyboard navigation and visual feedback.
