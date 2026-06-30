import type { IPuzzle, IPuzzleProvider } from '@crossword/core';

const MOCK_PUZZLE: IPuzzle = {
  id: 'mock-puzzle-1',
  title: 'My First Web Crossword',
  author: 'Crossword Engine',
  grid: {
    width: 5,
    height: 5,
    cells: [
      [
        { x: 0, y: 0, isBlock: false, correctValue: 'H' },
        { x: 1, y: 0, isBlock: false, correctValue: 'E' },
        { x: 2, y: 0, isBlock: false, correctValue: 'L' },
        { x: 3, y: 0, isBlock: false, correctValue: 'L' },
        { x: 4, y: 0, isBlock: false, correctValue: 'O' },
      ],
      [
        { x: 0, y: 1, isBlock: true },
        { x: 1, y: 1, isBlock: true },
        { x: 2, y: 1, isBlock: false, correctValue: 'I' },
        { x: 3, y: 1, isBlock: true },
        { x: 4, y: 1, isBlock: true },
      ],
      [
        { x: 0, y: 2, isBlock: false, correctValue: 'W' },
        { x: 1, y: 2, isBlock: false, correctValue: 'O' },
        { x: 2, y: 2, isBlock: false, correctValue: 'R' },
        { x: 3, y: 2, isBlock: false, correctValue: 'L' },
        { x: 4, y: 2, isBlock: false, correctValue: 'D' },
      ],
      [
        { x: 0, y: 3, isBlock: true },
        { x: 1, y: 3, isBlock: true },
        { x: 2, y: 3, isBlock: false, correctValue: 'D' },
        { x: 3, y: 3, isBlock: true },
        { x: 4, y: 3, isBlock: true },
      ],
      [
        { x: 0, y: 4, isBlock: true },
        { x: 1, y: 4, isBlock: true },
        { x: 2, y: 4, isBlock: false, correctValue: 'S' },
        { x: 3, y: 4, isBlock: true },
        { x: 4, y: 4, isBlock: true },
      ],
    ],
  },
  clues: {
    across: [
      {
        number: 1,
        direction: 'across',
        text: 'A common greeting',
        startX: 0,
        startY: 0,
        answerLength: 5,
      },
      { number: 3, direction: 'across', text: 'Our planet', startX: 0, startY: 2, answerLength: 5 },
    ],
    down: [
      { number: 2, direction: 'down', text: 'Some birds', startX: 2, startY: 0, answerLength: 5 },
    ],
  },
};

export class LocalPuzzleProvider implements IPuzzleProvider {
  async getPuzzle(_id: string): Promise<IPuzzle> {
    // In a real app, this would fetch from an API or a JSON file.
    // We simulate a network delay.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PUZZLE);
      }, 500);
    });
  }
}
