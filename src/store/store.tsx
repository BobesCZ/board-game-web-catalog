'use client';

import { createContext, useContext } from 'react';
import { AppStoreProviderProps, AppStoreValue } from './types';
import { useMyBggCollection } from '@/components/collection-loader/useMyBggCollection';
import { Game, MyBggCollection, MyBggStatus, MyBggStatusCollection } from '@/types';
import { BggCollectionGame } from '@code-bucket/board-game-geek';

const AppContext = createContext<AppStoreValue>({ gameList: [], activeGameListRecord: undefined });

const isMyBggStatusCollection = (item: string): item is MyBggStatusCollection =>
  [MyBggCollection.WANTTOBUY, MyBggCollection.WANTTOPLAY, MyBggCollection.WISHLIST].includes(item as MyBggCollection);

const getMergedGameList = (gameList: Game[], collectionGameList?: BggCollectionGame[]) =>
  gameList.map((game): Game => {
    const myBggGame = collectionGameList?.find(({ id }) => id === game.id);

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

export const AppStoreProvider = ({ children, value }: AppStoreProviderProps) => {
  const { myBggCollection } = useMyBggCollection();

  const mergedGameList = getMergedGameList(value.gameList, myBggCollection?.collectionGameList);

  return <AppContext.Provider value={{ ...value, gameList: mergedGameList }}>{children}</AppContext.Provider>;
};

export const useAppStore = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppStore must be used within a AppStoreProvider');
  }

  return context;
};
