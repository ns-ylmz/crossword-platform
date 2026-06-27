# Documentation

Welcome to the Crossword Platform documentation.

This repository follows a **documentation-driven development** approach, where architecture and design decisions are documented before implementation.

Documentation is considered a first-class artifact of the project. Code is expected to reflect the documented architecture rather than define it.

---

## Reading Order

If you are new to the project, follow this reading order:

1. [PROJECT.md](../PROJECT.md)
   - Understand the project's vision, goals, and long-term direction.

2. [AGENTS.md](../AGENTS.md)
   - Learn the architectural rules and engineering principles that govern the project.

3. `docs/`
   - Explore the detailed documentation describing the platform.

---

## Documentation Structure

The documentation is organized into independent sections.

Each section has a single responsibility and should avoid duplicating information from other documents.

| Section         | Purpose                                      |
| --------------- | -------------------------------------------- |
| `architecture/` | Technical architecture, domain models, and system design |
| `engineering/`  | Engineering philosophy, workflows, strategies, and principles |
| `design/`       | Implementation and design specs              |
| `adr/`          | Architecture Decision Records (ADRs)         |

---

## Documentation Principles

The documentation follows these principles:

- Documentation precedes implementation.
- Every document should have a single responsibility.
- Avoid duplicated information across documents.
- Prefer long-lived documents over temporary notes.
- Architectural decisions should be traceable.
- Domain terminology must remain consistent throughout the project.

---

## Contributing

Before introducing significant architectural or domain changes:

1. Discuss the change.
2. Document the decision.
3. Update the relevant documentation.
4. Implement the change.
5. Add or update tests.

Documentation should evolve together with the platform.

