# Pull Request Workflow

This document defines the Pull Request (PR) workflow for the Crossword Platform.

Pull Requests provide a structured review process before changes become part of the `main` branch.

The goal is to maintain code quality, architectural consistency, and project documentation throughout development.

---

## Pull Request Philosophy

Every Pull Request should represent a single logical change.

A Pull Request is an opportunity to review not only code, but also architecture, documentation, testing, and long-term maintainability.

Small and focused Pull Requests are preferred over large, multi-purpose changes.

---

## Pull Request Lifecycle

Each Pull Request follows the same lifecycle.

```text
Feature Branch
      │
      ▼
Open Pull Request
      │
      ▼
Review
      │
      ▼
Address Feedback
      │
      ▼
Approval
      │
      ▼
Merge
      │
      ▼
Delete Branch
```

---

## Before Opening a Pull Request

Before creating a Pull Request, contributors should ensure that:

- The branch is up to date.
- The implementation is complete.
- Relevant tests have been added or updated.
- Existing tests pass.
- Documentation has been updated when necessary.
- Commit history is clean and meaningful.

A Pull Request should be ready for review before it is opened.

---

## Pull Request Scope

A Pull Request should address one objective only.

Examples include:

- One feature
- One bug fix
- One architectural improvement
- One documentation update

Unrelated changes should be submitted as separate Pull Requests.

---

## Pull Request Description

Every Pull Request should clearly explain:

- What changed
- Why the change was made
- Which areas of the project are affected
- Whether documentation was updated
- Whether tests were added or modified

The description should focus on intent rather than implementation details.

---

## Review Guidelines

Reviews should evaluate:

- Architectural consistency
- Domain correctness
- Engineering principles
- Readability
- Simplicity
- Test quality
- Documentation completeness

Review feedback should improve the project rather than merely enforce personal preferences.

---

## Documentation Requirements

If a Pull Request changes:

- architecture,
- development workflow,
- public contracts,
- repository structure,
- engineering principles,

the corresponding documentation should be updated within the same Pull Request.

Documentation should remain the source of truth.

---

## Architecture Decisions

If a Pull Request introduces a significant architectural decision, contributors should evaluate whether a new ADR is required.

Architectural changes should not become permanent without appropriate documentation.

---

## Merge Strategy

The project prefers **Squash and Merge**.

Reasons include:

- Clean Git history
- One commit per logical change
- Easier reverts
- Improved traceability

Merge commits and rebases may be used when justified, but Squash and Merge is the default approach.

---

## After Merge

After a Pull Request has been merged:

- Delete the feature branch.
- Verify that the `main` branch remains stable.
- Confirm that documentation is synchronized.
- Ensure that the repository is ready for future work.

The `main` branch should always remain in a releasable state.

---

## AI Guidelines

AI agents should prepare Pull Requests that are complete and self-contained.

Before suggesting a Pull Request, AI agents should verify:

- Documentation is synchronized.
- Tests are present when appropriate.
- Commit messages follow the project's conventions.
- Branch names follow the branching strategy.
- Architectural decisions are documented when required.

AI agents should recommend opening smaller Pull Requests instead of combining unrelated work.

---

## Continuous Improvement

The Pull Request workflow should remain lightweight.

The review process exists to improve the quality of the project, encourage collaboration, and preserve architectural integrity rather than introduce unnecessary process.
