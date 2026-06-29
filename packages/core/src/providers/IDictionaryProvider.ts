/**
 * Interface-driven contract for verifying words against a dictionary.
 */
export interface IDictionaryProvider {
  /**
   * Checks if a given word exists in the dictionary.
   */
  isValidWord(word: string): Promise<boolean>;
}
