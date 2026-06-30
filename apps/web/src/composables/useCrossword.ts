import { ref, onMounted, onUnmounted } from 'vue';
import type { IGame, IPuzzle } from '@crossword/core';
import { CommandTypes, EventTypes } from '@crossword/core';
import { CrosswordEngine } from '@crossword/engine';
import { LocalPuzzleProvider } from '../providers/LocalPuzzleProvider';

export function useCrossword() {
  const engine = new CrosswordEngine();
  const puzzleProvider = new LocalPuzzleProvider();

  engine.attachPuzzleProvider(puzzleProvider);

  const game = ref<IGame | null>(null);
  const puzzle = ref<IPuzzle | null>(null);
  const isLoading = ref(true);

  // Vue reactive event handler
  const handleGameStateUpdate = () => {
    // Deep copy or re-assignment to trigger reactivity
    const currentGame = engine.getGame();
    if (currentGame) {
      game.value = { ...currentGame, userAnswers: { ...currentGame.userAnswers } };
    }
  };

  onMounted(async () => {
    // Subscribe to events to update Vue state
    engine.events.subscribe(EventTypes.GAME_STARTED, () => {
      handleGameStateUpdate();
      if (game.value) {
        puzzle.value = game.value.puzzle;
      }
      isLoading.value = false;
    });
    engine.events.subscribe(EventTypes.CELL_UPDATED, handleGameStateUpdate);

    // Initialize Game
    try {
      await engine.execute({
        type: CommandTypes.START_GAME,
        payload: { puzzleId: 'mock-puzzle-1' },
        timestamp: Date.now(),
      });
    } catch (e) {
      console.error('Failed to start game', e);
    }
  });

  onUnmounted(() => {
    // Ideally we'd unsubscribe, but we'll need to store the handler ref
    // engine.events.unsubscribe(...)
  });

  const updateCell = async (x: number, y: number, value: string) => {
    await engine.execute({
      type: CommandTypes.UPDATE_CELL,
      payload: { x, y, value },
      timestamp: Date.now(),
    });
  };

  return {
    game,
    puzzle,
    isLoading,
    updateCell,
  };
}
