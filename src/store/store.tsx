'use client';

import { createContext, useContext } from 'react';
import { useMyBggData } from './hooks';
import { AppStoreProviderProps, AppStoreValue } from './types';
import { getMergedGameList } from './utils';

const AppContext = createContext<AppStoreValue>({
  gameList: [],
  activeGameListRecord: undefined,
  myBggData: undefined,
  onMyBggDataChange: () => undefined,
  onMyBggDataClear: () => undefined,
});

export const AppStoreProvider = ({ children, activeGameListRecord }: AppStoreProviderProps) => {
  const myBggDataProps = useMyBggData();

  const gameList = activeGameListRecord?.gameList ?? [];
  const mergedGameList = getMergedGameList(gameList, myBggDataProps.myBggData?.bggCollectionGameList);

  return (
    <AppContext.Provider value={{ activeGameListRecord, gameList: mergedGameList, ...myBggDataProps }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppStore must be used within a AppStoreProvider');
  }

  return context;
};
