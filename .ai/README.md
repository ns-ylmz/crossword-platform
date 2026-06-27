# Agent Workspace

The `.ai` directory contains the resources that enable AI agents to understand, navigate, and contribute to the Crossword Platform.

Unlike the `docs/` directory, which serves as the project's knowledge base, the `.ai/` directory defines how AI agents consume that knowledge and participate in the development workflow.

The Agent Workspace is intentionally designed to remain independent of any specific AI platform or coding assistant.

---

## Purpose

The purpose of the Agent Workspace is to provide a consistent development experience for any AI agent working on the project.

It establishes a common entry point, shared workflows, reusable templates, and operational guidance without duplicating information already maintained elsewhere in the repository.

---

## Design Principles

The Agent Workspace follows a small set of principles.

### Tool-Agnostic

The workspace should support any AI agent.

No workflow should depend on a specific coding assistant, language model, or development platform.

---

### Single Source of Truth

Architectural knowledge belongs in the project's documentation.

The Agent Workspace references documentation rather than copying it.

Whenever documentation changes, AI agents should consume the updated documentation instead of relying on duplicated content.

---

### Progressive Evolution

The workspace should grow together with the project.

Only resources that provide long-term value should be added.

Temporary experiments, prompts, or agent-specific instructions should not become permanent parts of the repository.

---

### Reusable

The Agent Workspace should be reusable across projects whenever practical.

Project-independent workflows should remain generic and portable.

Project-specific knowledge belongs in the project's documentation.

---

## Relationship to Documentation

The repository distinguishes between knowledge and execution.

```text
docs/
    Knowledge Base

.ai/
    Agent Workspace
```

The documentation explains the project.

The Agent Workspace explains how AI agents should interact with the project.

The two directories complement each other without overlapping responsibilities.

---

## Expected Structure

The workspace is expected to evolve gradually.

A typical structure may include:

```text
.ai/
├── README.md
├── context.md
├── templates/
├── checklists/
├── playbooks/
├── workflows/
└── handoffs/
```

Additional resources should only be introduced when they provide clear value.

---

## Contribution Guidelines

Contributors should avoid placing architectural knowledge inside the Agent Workspace.

Instead:

- Add or update project knowledge in `docs/`.
- Reference that knowledge from the Agent Workspace.
- Keep workflows lightweight and maintainable.
- Prefer reusable guidance over project-specific instructions.

---

## Long-Term Vision

The Agent Workspace is intended to support agent-assisted software engineering rather than a single AI tool.

As AI capabilities evolve, new agents should be able to contribute by understanding the same documentation, following the same workflows, and respecting the same engineering principles.

The workspace should remain simple, portable, and independent of any individual AI platform.
