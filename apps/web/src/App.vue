<script setup lang="ts">
import { useCrossword } from './composables/useCrossword';
import CrosswordGrid from './components/CrosswordGrid.vue';

const { game, puzzle, isLoading, placeWord } = useCrossword();
</script>

<template>
  <main>
    <h1>Crossword Platform</h1>
    <p class="subtitle">Agentic architecture running on the browser.</p>

    <div v-if="isLoading" class="loading glass-panel">Initializing Engine...</div>

    <div v-else class="game-area">
      <CrosswordGrid :game="game" :puzzle="puzzle" @place-word="placeWord" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.game-area {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
