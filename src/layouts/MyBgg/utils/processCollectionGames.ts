import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { getCollectionData } from '@/bgg/actions';
import { PROCESS_COLLECTION_TIMEOUT } from '../config';

export const processCollectionGames = async (username: string): Promise<BggCollectionGame[] | undefined> => {
  try {
    const result = await getCollectionData(username);

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
