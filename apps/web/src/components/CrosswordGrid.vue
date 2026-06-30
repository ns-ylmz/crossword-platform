<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IGame, IPuzzle } from '@crossword/core';

const props = defineProps<{
  game: IGame | null;
  puzzle: IPuzzle | null;
}>();

const emit = defineEmits<{
  (e: 'placeWord', x: number, y: number, direction: 'across' | 'down', word: string): void;
}>();

const selectedDirection = ref<'across' | 'down'>('across');
const wordInput = ref('');
const selectedCell = ref<{ x: number; y: number } | null>(null);

const gridStyle = computed(() => {
  if (!props.puzzle) return {};
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.puzzle.grid.width}, var(--cell-size))`,
    gap: '2px',
    background: 'var(--surface-border)',
    padding: '2px',
    borderRadius: '4px',
    width: 'fit-content',
    margin: '0 auto',
  };
});

const getCellData = (x: number, y: number) => {
  if (!props.puzzle) return null;
  return props.puzzle.grid.cells[y][x];
};

const getAnswer = (x: number, y: number) => {
  if (!props.game) return '';
  return props.game.userAnswers[`${x},${y}`] || '';
};

const selectCell = (x: number, y: number) => {
  const cell = getCellData(x, y);
  if (cell?.isBlock) return;

  if (selectedCell.value?.x === x && selectedCell.value?.y === y) {
    // Toggle direction if clicking the same cell
    selectedDirection.value = selectedDirection.value === 'across' ? 'down' : 'across';
  } else {
    selectedCell.value = { x, y };
  }
};

const submitWord = () => {
  if (!selectedCell.value || !wordInput.value) return;
  emit(
    'placeWord',
    selectedCell.value.x,
    selectedCell.value.y,
    selectedDirection.value,
    wordInput.value.toUpperCase(),
  );
  wordInput.value = ''; // Reset input
};
</script>

<template>
  <div class="crossword-container">
    <div class="score-board glass-panel">
      Score: <span>{{ game?.score || 0 }}</span>
    </div>

    <div :style="gridStyle" class="grid-board glass-panel">
      <template v-for="y in puzzle?.grid.height" :key="`row-${y}`">
        <template v-for="x in puzzle?.grid.width" :key="`cell-${x}-${y}`">
          <div
            class="cell"
            :class="{
              'cell--empty': getCellData(x - 1, y - 1)?.isBlock,
              'cell--active': selectedCell?.x === x - 1 && selectedCell?.y === y - 1,
            }"
            @click="selectCell(x - 1, y - 1)"
          >
            {{ getAnswer(x - 1, y - 1) }}
          </div>
        </template>
      </template>
    </div>

    <div class="controls glass-panel" v-if="selectedCell">
      <div class="control-header">
        <span>Starting at: ({{ selectedCell.x }}, {{ selectedCell.y }})</span>
        <span
          class="direction-toggle"
          @click="selectedDirection = selectedDirection === 'across' ? 'down' : 'across'"
        >
          Direction: {{ selectedDirection.toUpperCase() }}
        </span>
      </div>
      <div class="input-group">
        <input
          v-model="wordInput"
          type="text"
          placeholder="Enter word..."
          @keyup.enter="submitWord"
          maxlength="15"
        />
        <button @click="submitWord">Place</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crossword-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
}

.score-board {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.score-board span {
  color: var(--accent-color);
}

.cell {
  width: var(--cell-size);
  height: var(--cell-size);
  background: var(--cell-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--cell-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cell:not(.cell--empty):hover {
  background: rgba(255, 255, 255, 0.1);
}

.cell--empty {
  background: var(--cell-blank);
  cursor: default;
}

.cell--active {
  background: var(--cell-active);
  box-shadow: inset 0 0 0 2px var(--accent-color);
}

.controls {
  padding: 1.5rem;
}

.control-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.direction-toggle {
  cursor: pointer;
  color: var(--accent-color);
}

.input-group {
  display: flex;
  gap: 1rem;
}

input {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: var(--accent-color);
}

button {
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #2563eb;
}
</style>
