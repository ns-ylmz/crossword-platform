# Crossword Platform: Web Application

This is the Vue 3 frontend reference application for the Crossword Platform, built using Vite.

## Architecture

This application strictly acts as a **presentation layer**.

- It does **not** contain any crossword business logic (like checking word boundaries, computing scores, or managing game state transitions).
- It consumes the `@crossword/engine` package to perform these actions.
- The UI listens to `CrosswordEngine` events (via `EventDispatcher`) to reactively update the HTML/CSS grids.

## Setup & Development

Ensure you have run `pnpm install` in the monorepo root.

To start the web application:

```bash
# From the root directory
pnpm --filter web dev

# Or from this directory
pnpm run dev
```

Navigate to `http://localhost:5173/` in your browser.

## Built With

- **Vue 3** (Composition API)
- **Vite**
- **TypeScript**
- **Vanilla CSS** (Premium Dark Mode Aesthetic)
