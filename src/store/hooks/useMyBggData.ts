import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { createMyBggRecord, updateMyBggRecord } from '@/admin/actions';

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

      const fixedGameList = bggCollectionGameList.map((item) => ({
        ...item,
        userRating: item.userRating,
      }));
      const newMyBggData: MyBggData = { created, username, bggCollectionGameList: fixedGameList };

      setMyBggData((prev) => {
        if (!prev) {
          createMyBggRecord(username, bggCollectionGameList.length, created);
        } else {
          updateMyBggRecord(username, bggCollectionGameList.length);
        }

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
