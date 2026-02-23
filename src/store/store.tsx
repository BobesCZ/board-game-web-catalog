'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { APP_THEME_DEFAULT, APP_THEME_OPTIONS } from '@/theme/config';
import { useMyBggData } from './hooks';
import { AppStoreProviderProps, AppStoreValue } from './types';
import { getMergedGameList } from './utils';

const AppContext = createContext<AppStoreValue>({
  gameList: [],
  activeGameListRecord: undefined,
  myBggData: undefined,
  onMyBggDataChange: () => undefined,
  onMyBggDataClear: () => undefined,
  appTheme: APP_THEME_DEFAULT,
  changeAppTheme: () => undefined,
});

export const AppStoreProvider = ({ children, activeGameListRecord }: AppStoreProviderProps) => {
  const myBggDataProps = useMyBggData();

  const gameList = activeGameListRecord?.gameList ?? [];
  const mergedGameList = getMergedGameList(gameList, myBggDataProps.myBggData?.bggCollectionGameList);

  const [appThemeId, setAppThemeId] = useLocalStorage('appTheme', APP_THEME_DEFAULT.id);
  const appTheme = APP_THEME_OPTIONS.find(({ id }) => id === appThemeId) ?? APP_THEME_DEFAULT;
  const { refresh } = useRouter();

  const changeAppTheme = (id: string) => {
    setAppThemeId(id);
    refresh();
  };

  return (
    <AppContext.Provider
      value={{ activeGameListRecord, gameList: mergedGameList, ...myBggDataProps, appTheme, changeAppTheme }}
    >
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
