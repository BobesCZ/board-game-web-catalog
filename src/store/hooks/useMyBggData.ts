import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { WebEventType, createWebEventRecord } from '@/admin/actions';

const MY_BGG_DATA_KEY = 'myBggData';

export type MyBggData = {
  created: number;
  username: string;
  bggCollectionGameList: BggCollectionGame[];
};

export const useMyBggData = () => {
  const [myBggData, setMyBggData, removeBggData] = useLocalStorage<MyBggData | undefined>(MY_BGG_DATA_KEY, undefined);

  const onMyBggDataChange = useCallback(
    (username: string, bggCollectionGameList: BggCollectionGame[]) => {
      const created = Date.now();

      const newMyBggData: MyBggData = { created, username, bggCollectionGameList };

      setMyBggData((prev) => {
        const webEvent = {
          type: WebEventType.MY_BGG,
          place: !prev ? 'CreateRecord' : 'UpdateRecord',
          data: { username, gameListCount: bggCollectionGameList.length },
        };
        createWebEventRecord(webEvent);

        return newMyBggData;
      });
    },
    [setMyBggData],
  );

  const onMyBggDataClear = () => {
    removeBggData();
  };

  return {
    myBggData,
    onMyBggDataChange,
    onMyBggDataClear,
  };
};
