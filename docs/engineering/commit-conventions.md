# Commit Conventions

This document defines the commit message conventions used throughout the Crossword Platform.

Commit messages should be concise, descriptive, and easy to understand.

Every commit should represent a single logical change.

---

## Commit Format

All commit messages should follow the same structure.

```text
<type>(<scope>): <description>
```

Example:

```text
docs(domain): define domain model

feat(engine): add puzzle generator

fix(core): resolve event dispatch bug

test(engine): add grid validation tests
```

The scope should identify the primary area affected by the commit.

The description should briefly explain what changed.

---

## Commit Types

The following commit types are allowed.

### feat

Introduces a new feature.

Examples:

```text
feat(engine): add crossword generator

feat(ui): implement puzzle board
```

---

### fix

Resolves a defect or incorrect behavior.

Examples:

```text
fix(core): resolve event ordering

fix(engine): prevent invalid placement
```

---

### docs

Documentation only.

Examples:

```text
docs(domain): define domain model

docs(workflow): define testing strategy
```

---

### refactor

Improves internal structure without changing behavior.

Examples:

```text
refactor(engine): simplify generation pipeline
```

---

### test

Adds or updates tests.

Examples:

```text
test(core): add coordinate tests
```

---

### perf

Improves performance without changing behavior.

Examples:

```text
perf(engine): optimize word placement
```

---

### build

Changes build configuration or workspace setup.

Examples:

```text
build(workspace): configure pnpm
```

---

### ci

Changes continuous integration workflows.

Examples:

```text
ci(github): add pull request workflow
```

---

### chore

Routine maintenance that does not fit another category.

Examples:

```text
chore(repo): update editorconfig
```

---

### style

Formatting or style changes that do not affect behavior.

Examples:

```text
style(core): apply formatting
```

---

### revert

Reverts a previous commit.

Examples:

```text
revert(engine): revert event pipeline
```

---

## Commit Scope

Whenever practical, commits should include a scope.

Typical scopes include:

```text
repo
workspace
docs
core
engine
providers
plugins
ui
web
vue
react
cli
tests
github
release
```

Additional scopes may be introduced when they clearly represent a stable part of the project.

---

## Writing Guidelines

Commit descriptions should:

- Use the imperative mood.
- Describe what changed.
- Remain concise.
- Avoid unnecessary details.
- Begin with a lowercase letter.
- Not end with a period.

Good examples:

```text
feat(engine): add puzzle generator

docs(architecture): define dependency rules

fix(core): resolve circular event dispatch
```

Avoid:

```text
fixed bug

misc updates

changes

work in progress

update

final version
```

---

## Commit Size

Each commit should represent one logical change.

Large features should be divided into multiple focused commits whenever practical.

Commits should remain easy to review and revert.

---

## AI Guidelines

AI agents should:

- Select the most appropriate commit type.
- Use an explicit scope whenever possible.
- Keep descriptions short and descriptive.
- Avoid combining unrelated changes into a single commit.

If multiple independent changes exist, they should be committed separately.

Consistency is preferred over creativity.
