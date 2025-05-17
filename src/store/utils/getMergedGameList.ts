'use client';

import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { Game, MyBggCollection, MyBggStatus, MyBggStatusCollection } from '@/types';

const isMyBggStatusCollection = (item: string): item is MyBggStatusCollection =>
  [MyBggCollection.WANTTOBUY, MyBggCollection.WANTTOPLAY, MyBggCollection.WISHLIST].includes(item as MyBggCollection);

export const getMergedGameList = (gameList: Game[], bggCollectionGameList?: BggCollectionGame[]) =>
  gameList.map((game): Game => {
    const myBggGame = bggCollectionGameList?.find(({ id }) => id === game.id);

    if (!myBggGame) return game;

    const { userStatus, userRating } = myBggGame;

    const myBggCollections = Object.entries(userStatus).reduce((res: MyBggStatusCollection[], [name, value]) => {
      if (isMyBggStatusCollection(name) && value) return [...res, name];

      return res;
    }, []);

    const myBggStatus: MyBggStatus = {
      collections: myBggCollections,
      userRating,
    };

    return { ...game, myBggStatus };
  });
