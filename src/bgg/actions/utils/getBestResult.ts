import { BggSearch } from '@code-bucket/board-game-geek';
import { maxBy } from 'lodash-es';
import { stringSimilarity } from 'string-similarity-js';

/**
 * Find result with exact match (fallback: first result)
 */
export const getBestResult = (parsedName: string, searchResult: BggSearch[]): BggSearch => {
  const exactMatch = searchResult.find(({ name }) => name === parsedName);

  if (exactMatch) {
    return exactMatch;
  }

  const mostSimilarMatch = maxBy(searchResult, ({ name }) => stringSimilarity(name, parsedName));

  return mostSimilarMatch || searchResult[0];
};
