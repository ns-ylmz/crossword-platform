# Domain Model

This document defines the ubiquitous language of the Crossword Platform.

Every architectural decision, implementation, and API should use the terminology defined here.

The purpose of this document is not to describe implementation details, but to establish a shared vocabulary across the project.

---

## Domain Philosophy

The domain should remain independent from frameworks, storage, user interfaces, and infrastructure.

Every concept defined here represents a business concept rather than a technical implementation.

---

## Core Concepts

### Puzzle

A Puzzle represents a complete crossword challenge.

A Puzzle consists of a structured grid, a collection of words, and the clues required to solve them.

A Puzzle is immutable once generated.

---

### Grid

A Grid defines the spatial layout of a Puzzle.

It contains Cells arranged in rows and columns.

The Grid knows nothing about user interaction or rendering.

---

### Cell

A Cell represents a single position inside a Grid.

A Cell may be:

- Empty
- Blocked
- Occupied by a character

A Cell belongs to exactly one Grid.

---

### Word

A Word represents a valid answer placed inside a Puzzle.

Each Word has:

- Text
- Start position
- Direction
- Length

A Word occupies one or more Cells.

---

### Clue

A Clue provides the information required to solve a Word.

A Clue belongs to exactly one Word.

The origin of a Clue is outside the domain.

---

### Theme

A Theme defines the semantic context used when generating a Puzzle.

Examples include:

- Animals
- Space
- Movies
- Programming
- History

A Theme influences generation but is not responsible for generating content.

---

### Dictionary

A Dictionary represents a source of candidate words.

The Dictionary itself does not belong to the Engine implementation.

It is an external capability consumed through platform contracts.

---

### Coordinate

A Coordinate identifies a position inside a Grid.

Coordinates are independent from rendering systems.

---

### Direction

Direction describes how a Word is placed inside the Grid.

Supported directions are intentionally defined by the platform rather than user interfaces.

---

### Placement

Placement describes the relationship between a Word and the Grid.

It determines where and how a Word occupies Cells.

---

### Move

A Move represents a user's interaction with a Puzzle.

Examples include:

- Entering a character
- Removing a character
- Revealing a cell
- Revealing a word

A Move never modifies the Puzzle itself.

Instead, it produces a new game state.

---

### Game

A Game represents a player's progress while solving a Puzzle.

Unlike a Puzzle, a Game evolves over time.

The Game keeps track of:

- Current progress
- Solved words
- Remaining cells
- Player actions

A Game references a Puzzle but is conceptually distinct from it.

---

## Relationships

```
Theme
    │
    ▼
Puzzle
    │
    ├──── Grid
    │        │
    │        └──── Cell
    │
    ├──── Word
    │        │
    │        └──── Clue
    │
    └──── Dictionary

Puzzle
    ▲
    │
Game
    │
    └──── Move
```

The relationships above describe conceptual ownership rather than implementation.

---

## Ubiquitous Language

The terminology defined in this document should remain consistent across:

- Documentation
- Source code
- Public APIs
- Tests
- Commit messages
- Architecture Decision Records

Alternative names should be avoided unless a new domain concept is intentionally introduced.

---

## Future Evolution

The domain model should evolve by introducing new concepts only when existing concepts can no longer express the required behavior.

New terminology should be introduced deliberately and documented before implementation.
