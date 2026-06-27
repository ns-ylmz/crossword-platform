# Branching Strategy

This document defines the branching strategy used throughout the Crossword Platform.

The goal is to keep development simple, predictable, and compatible with continuous integration and AI-assisted development.

The project follows a lightweight branching model inspired by Trunk-Based Development.

---

## Branch Philosophy

The `main` branch is the single source of truth.

It should always remain stable, releasable, and deployable.

Development should occur in short-lived feature branches that are merged back into `main` after review.

Long-lived branches should be avoided.

---

## Branch Types

The project defines a small set of branch types.

### main

The primary development branch.

Characteristics:

- Always stable
- Always buildable
- Always releasable
- Protected from direct development

---

### feature

Feature branches are used for new functionality.

Naming convention:

```text
feature/<short-description>
```

Examples:

```text
feature/puzzle-generator
feature/event-system
feature/vue-board
feature/plugin-api
```

Feature branches should remain focused on a single feature or architectural change.

---

### fix

Bug fixes should be developed in dedicated branches.

Naming convention:

```text
fix/<short-description>
```

Examples:

```text
fix/event-order
fix/grid-validation
fix/provider-timeout
```

---

### docs

Documentation changes should be isolated whenever practical.

Naming convention:

```text
docs/<short-description>
```

Examples:

```text
docs/testing-strategy
docs/domain-model
docs/architecture
```

---

### chore

Repository maintenance tasks may use dedicated branches.

Naming convention:

```text
chore/<short-description>
```

Examples:

```text
chore/workspace-config
chore/update-dependencies
```

---

## Branch Lifetime

Branches should be short-lived.

Once a branch has achieved its purpose, it should be merged and removed.

Long-running branches increase merge complexity and should be avoided whenever practical.

---

## Branch Scope

A branch should represent one logical objective.

Examples include:

- One feature
- One bug fix
- One architectural change
- One documentation update

Multiple unrelated changes should not be developed within the same branch.

---

## Merge Strategy

Changes should be merged into `main` through a Pull Request.

Direct commits to `main` should be avoided.

Completed branches should be deleted after merging.

The project prefers a linear and understandable Git history.

---

## Naming Guidelines

Branch names should:

- Be lowercase
- Use kebab-case
- Be concise
- Describe intent rather than implementation
- Avoid issue numbers unless required by external tooling

Good examples:

```text
feature/crossword-generator
fix/event-dispatch
docs/testing-strategy
```

Avoid:

```text
feature/new-stuff
feature/update
feature/final-version
```

---

## AI Guidelines

AI agents should create branches that follow the naming conventions defined in this document.

Branch names should communicate the purpose of the work rather than the implementation details.

When multiple independent changes are required, separate branches should be created.

AI agents should never propose direct commits to the `main` branch.

---

## Continuous Evolution

The branching strategy should remain lightweight.

Additional branch types should only be introduced when they provide clear value.

Simplicity and consistency are preferred over complex Git workflows.
