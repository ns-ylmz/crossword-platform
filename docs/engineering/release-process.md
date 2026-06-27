# Release Process

This document defines the release process for the Crossword Platform.

The objective is to ensure that every release is intentional, traceable, reproducible, and aligned with the project's engineering principles.

The release process should remain lightweight while supporting future automation.

---

## Release Philosophy

Releases represent stable milestones in the evolution of the project.

Every release should be:

- Stable
- Documented
- Tested
- Reproducible

A release is the result of a completed development cycle rather than a collection of arbitrary commits.

---

## Release Readiness

Before creating a release, contributors should verify that:

- The `main` branch is stable.
- All planned changes have been merged.
- Relevant documentation has been updated.
- Required ADRs have been created.
- Tests pass successfully.
- No known critical issues remain.

The repository should always be capable of producing a release from the `main` branch.

---

## Versioning

The project follows Semantic Versioning (SemVer).

```text id="1yxx6d"
MAJOR.MINOR.PATCH
```

General rules:

- **MAJOR** — Breaking changes.
- **MINOR** — New backward-compatible functionality.
- **PATCH** — Backward-compatible bug fixes.

Version numbers should communicate compatibility rather than development effort.

---

## Release Workflow

Every release follows the same high-level process.

```text id="wyvr7l"
Development
      │
      ▼
Merge into main
      │
      ▼
Validation
      │
      ▼
Version Update
      │
      ▼
Tag Release
      │
      ▼
Publish
```

Each step should be completed before proceeding to the next.

---

## Release Notes

Every release should include release notes.

Release notes should summarize:

- New features
- Bug fixes
- Architectural changes
- Breaking changes
- Documentation updates (when relevant)

Release notes should describe user-visible changes rather than implementation details.

---

## Git Tags

Every release should be associated with a Git tag.

Example:

```text id="pmvwhf"
v0.1.0

v0.2.0

v1.0.0
```

Tags provide a permanent reference for released versions.

---

## Package Publishing

When publishable packages are introduced, releases should publish only packages that have changed.

Publishing should be reproducible and preferably automated.

The release process should support independent package evolution where appropriate.

---

## Documentation Requirements

Documentation should be synchronized with every release.

If a release changes:

- architecture,
- public APIs,
- workflows,
- engineering principles,
- repository organization,

the relevant documentation should be updated before publishing.

Documentation remains the project's source of truth.

---

## Quality Gates

A release should satisfy the following quality gates:

- All tests pass.
- Documentation is current.
- No unresolved critical defects exist.
- Public APIs are validated.
- Version information is updated.

Releases should prioritize stability over delivery speed.

---

## AI Guidelines

AI agents should assist with release preparation by verifying:

- Documentation completeness.
- ADR consistency.
- Test status.
- Version updates.
- Release notes.

AI agents should not recommend publishing a release that does not satisfy the project's quality gates.

---

## Continuous Improvement

The release process should evolve together with the project.

As automation is introduced, manual steps may be replaced by CI/CD pipelines while preserving the same release principles.

The process should remain simple, transparent, and reproducible regardless of project size.
