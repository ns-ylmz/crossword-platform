<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { IGame, IPuzzle } from '@crossword/core';

const props = defineProps<{
  game: IGame | null;
  puzzle: IPuzzle | null;
}>();

const emit = defineEmits<{
  (e: 'updateCell', x: number, y: number, value: string): void;
}>();

const selectedDirection = ref<'across' | 'down'>('across');
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
    outline: 'none', // Remove focus outline since we have custom active state
  };
});

const getCellData = (x: number, y: number) => {
  if (!props.puzzle) return null;
  return props.puzzle.grid.cells[y]?.[x];
};

const getAnswerData = (x: number, y: number) => {
  if (!props.game) return null;
  return props.game.userAnswers[`${x},${y}`];
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

const moveSelection = (dx: number, dy: number) => {
  if (!selectedCell.value || !props.puzzle) return;

  let newX = selectedCell.value.x + dx;
  let newY = selectedCell.value.y + dy;

  // Boundary check
  if (newX < 0) newX = 0;
  if (newX >= props.puzzle.grid.width) newX = props.puzzle.grid.width - 1;
  if (newY < 0) newY = 0;
  if (newY >= props.puzzle.grid.height) newY = props.puzzle.grid.height - 1;

  // Skip blocks if possible, or just select it if it's not a block
  const cell = getCellData(newX, newY);
  if (cell && !cell.isBlock) {
    selectedCell.value = { x: newX, y: newY };
  }
};

const advanceSelection = (backward = false) => {
  if (selectedDirection.value === 'across') {
    moveSelection(backward ? -1 : 1, 0);
  } else {
    moveSelection(0, backward ? -1 : 1);
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!selectedCell.value) return;

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    moveSelection(0, -1);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    moveSelection(0, 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    moveSelection(-1, 0);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    moveSelection(1, 0);
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    emit('updateCell', selectedCell.value.x, selectedCell.value.y, '');
    advanceSelection(true);
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    e.preventDefault();
    emit('updateCell', selectedCell.value.x, selectedCell.value.y, e.key.toUpperCase());
    advanceSelection(false);
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    selectedDirection.value = selectedDirection.value === 'across' ? 'down' : 'across';
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="crossword-container">
    <div :style="gridStyle" class="grid-board glass-panel" tabindex="0">
      <template v-for="y in puzzle?.grid.height" :key="`row-${y}`">
        <template v-for="x in puzzle?.grid.width" :key="`cell-${x}-${y}`">
          <div
            class="cell"
            :class="{
              'cell--empty': getCellData(x - 1, y - 1)?.isBlock,
              'cell--active': selectedCell?.x === x - 1 && selectedCell?.y === y - 1,
              'cell--correct': getAnswerData(x - 1, y - 1)?.isCorrect === true,
              'cell--incorrect':
                getAnswerData(x - 1, y - 1)?.isCorrect === false &&
                getAnswerData(x - 1, y - 1)?.value !== '',
            }"
            @click="selectCell(x - 1, y - 1)"
          >
            {{ getAnswerData(x - 1, y - 1)?.value || '' }}
          </div>
        </template>
      </template>
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

/* Feedback Colors */
.cell--correct {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.cell--incorrect {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

/* Ensure active cell overrides feedback background slightly so user sees it */
.cell--active.cell--correct,
.cell--active.cell--incorrect {
  box-shadow: inset 0 0 0 2px var(--accent-color);
  background: var(--cell-active);
}
</style>
