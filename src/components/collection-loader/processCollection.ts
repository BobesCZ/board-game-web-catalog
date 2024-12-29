import { PROCESS_GAME_TIMEOUT } from '@/app/[locale]/admin/[gameListRecordId]/_components/config';
import { fetchCollectionData } from '@/app/[locale]/admin/[gameListRecordId]/_components/utils/fetchUtils';
import { BggCollectionGame } from '@code-bucket/board-game-geek';

export const processCollection = async (username: string): Promise<BggCollectionGame[] | undefined> => {
  try {
    const result = await fetchCollectionData(username);

    if (result === null) {
      await new Promise((resolve) => setTimeout(resolve, PROCESS_GAME_TIMEOUT));

      return processCollection(username);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
