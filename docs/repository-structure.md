# Repository Structure

This document defines how the Crossword Platform is organized within the repository.

The repository structure reflects the architectural boundaries of the platform. Directories exist to express responsibilities rather than implementation details.

The project follows a monorepo approach to simplify development while maintaining clear separation between independent components.

---

## Design Goals

The repository structure is designed to achieve the following goals:

- Clear ownership
- Independent packages
- Explicit dependencies
- Scalable organization
- Easy discoverability
- Long-term maintainability

The physical structure of the repository should reinforce the architectural principles defined in [Engineering Principles](engineering-principles.md).

---

## Repository Layout

The repository is organized into several top-level areas.

```
/
├── .ai/
├── apps/
├── packages/
├── docs/
├── examples/
├── tools/
├── AGENTS.md
├── PROJECT.md
└── README.md
```

Each top-level directory has a single responsibility.

---

## Applications

The `apps/` directory contains executable applications.

Applications are responsible for user interaction and platform integration.

Examples include:

- Web application
- Development playground
- CLI tools
- Future desktop or mobile applications

Applications should contain presentation logic only.

Business logic belongs to the Engine.

---

## Packages

The `packages/` directory contains reusable platform components.

Each package represents an independently maintainable unit.

Examples include:

- Core
- Engine
- Providers
- Plugins
- Shared utilities

Packages should communicate through explicit contracts.

---

## Documentation

The `docs/` directory contains the project's technical documentation.

Documentation should evolve together with the codebase.

Architecture, domain knowledge, and engineering decisions should be documented before implementation whenever practical.

---

## Examples

The `examples/` directory demonstrates how platform components are intended to be used.

Examples are educational rather than production code.

They should remain small, focused, and easy to understand.

---

## Tools

The `tools/` directory contains internal development utilities.

Typical examples include:

- Code generation
- Validation scripts
- Development helpers
- Repository maintenance

Tools support development but are not part of the platform itself.

---

## Agent Workspace

The `.ai/` directory contains resources that enable AI agents to contribute to the project.

It provides workflows, templates, and operational guidance without duplicating architectural knowledge.

AI agents should read the project documentation inside `docs/` but follow the workflows defined inside `.ai/`.

---

## Package Independence

Packages should remain independent whenever possible.

Dependencies should always be intentional.

Circular dependencies are not allowed.

Packages should communicate through stable public contracts rather than internal implementation details.

---

## Repository Evolution

The repository structure should evolve gradually.

New top-level directories should only be introduced when they provide a clear architectural benefit.

Avoid creating directories for anticipated future needs.

The repository should follow the principle of Progressive Decomposition defined in [Engineering Principles](engineering-principles.md).

---

## Naming Conventions

Directory names should be:

- Descriptive
- Lowercase
- Consistent
- Technology-independent whenever practical

Names should communicate responsibility rather than implementation.

---

## Future Evolution

As the platform grows, additional packages and applications may be introduced without changing the overall organization of the repository.

Growth should occur by extending existing architectural boundaries rather than reorganizing the entire repository.
