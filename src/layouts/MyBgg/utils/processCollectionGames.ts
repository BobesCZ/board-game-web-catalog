import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { PROCESS_COLLECTION_TIMEOUT } from '../config';
import { fetchCollectionData } from './fetchUtils';

export const processCollectionGames = async (username: string): Promise<BggCollectionGame[] | undefined> => {
  try {
    const result = await fetchCollectionData(username);

    if (result === null) {
      await new Promise((resolve) => setTimeout(resolve, PROCESS_COLLECTION_TIMEOUT));

      return processCollectionGames(username);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
