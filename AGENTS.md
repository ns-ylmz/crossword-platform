# Crossword Platform Rules

## Purpose

This file defines the strict constraints (hard rules) that all AI agents must follow when contributing to the Crossword Platform.

**CRITICAL INSTRUCTION FOR ALL AGENTS:**
Before making any architectural decisions, generating code, or modifying files, you MUST read and follow the bootstrap process defined in:
[.ai/context.md](.ai/context.md)

Do not rely on assumptions. The `docs/` directory is the single source of truth for the project's architecture, domain, and workflow.

---

## Things You Must Never Do

These rules are absolute and non-negotiable.

- Never import UI frameworks (Vue, React, etc.) into Engine or Core packages.
- Never access the DOM or browser APIs inside the Engine.
- Never bypass Core contracts for inter-module communication.
- Never couple Providers directly to the Engine implementation.
- Never introduce circular dependencies.
- Never move business logic, state management, or validation into UI components.
- Never break or rename the ubiquitous domain language (Puzzle, Game, Grid, Cell, etc.).
- Never introduce significant architectural changes without documenting them first (ADR).
