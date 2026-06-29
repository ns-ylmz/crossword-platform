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
- `[/]` Install and configure Prettier for the workspace.

## M0.2: Package Scaffolding

- `[ ]` Create directory `packages/core`.
- `[ ]` Initialize `package.json` in `packages/core` (name: `@crossword/core`).
- `[ ]` Create directory `packages/engine`.
- `[ ]` Initialize `package.json` in `packages/engine` (name: `@crossword/engine`).
- `[ ]` Add `@crossword/core` as a dependency to `@crossword/engine`.
