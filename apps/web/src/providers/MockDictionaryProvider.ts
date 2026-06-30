import type { IDictionaryProvider } from '@crossword/core';

export class MockDictionaryProvider implements IDictionaryProvider {
  async isValidWord(_word: string): Promise<boolean> {
    // As per user requirement, we blindly accept all words as valid in this phase.
    return Promise.resolve(true);
  }
}
