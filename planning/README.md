# Project Planning Index

Welcome to the `planning/` directory. This folder acts as the central hub for tracking the project's long-term vision, mid-term goals, and immediate execution tasks.

This project is developed collaboratively by human developers and autonomous AI agents. To prevent architectural drift, the planning files are structured in a strict 3-tier hierarchy.

## 1. The 3-Tier Architecture

| File | Scope | Purpose |
| :--- | :--- | :--- |
| [ROADMAP.md](ROADMAP.md) | 10,000-foot view | Defines the overarching phases of the project (e.g., Phase 0: Infra, Phase 1: Engine). Seldom changes. |
| [MILESTONES.md](MILESTONES.md) | 1,000-foot view | Breaks the active Roadmap phase down into measurable deliverables (e.g., M0.1: Workspace setup). |
| [BACKLOG.md](BACKLOG.md) | Ground level | The granular execution checklist. Contains the actual tasks waiting to be picked up. |

## 2. Agent Execution Workflow

If you are an AI agent picking up a task from this repository, you **MUST** follow this strict PR-based workflow:

1. **Claim the task:** Open `BACKLOG.md` and change the target task's checkbox from `[ ]` to `[/]`. Commit this change immediately to signal you are working on it.
2. **Branch out:** Create a new feature branch (e.g., `git checkout -b feat/m0-1-setup-pnpm`).
3. **Execute:** Implement the code, write the tests, and verify your changes.
4. **Pull Request:** Push your branch to the remote repository and submit a Pull Request against the `main` branch.
5. **Review:** Wait for human review and approval. Do not merge your own PR unless explicitly instructed to do so.
6. **Completion:** Once the PR is merged, update `BACKLOG.md` on the `main` branch to mark the task as `[x]`.
