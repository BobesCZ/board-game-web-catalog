'use client';

import { createContext, useContext } from 'react';
import { AppStoreProviderProps, AppStoreValue } from './types';
import { APP_THEME_DEFAULT, APP_THEME_OPTIONS } from '@/theme/config';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

const AppContext = createContext<AppStoreValue>({
  appTheme: APP_THEME_DEFAULT,
  changeAppTheme: () => undefined,
  gameList: [],
  activeGameListRecord: undefined,
});

export const AppStoreProvider = ({ children, value }: AppStoreProviderProps) => {
  const [appThemeId, setAppThemeId] = useLocalStorage('appTheme', APP_THEME_DEFAULT.id);
  const appTheme = APP_THEME_OPTIONS.find(({ id }) => id === appThemeId) ?? APP_THEME_DEFAULT;
  const { refresh } = useRouter();

  const changeAppTheme = (id: string) => {
    setAppThemeId(id);
    refresh();
  };

  return <AppContext.Provider value={{ ...value, appTheme, changeAppTheme }}>{children}</AppContext.Provider>;
};

export const useAppStore = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppStore must be used within a AppStoreProvider');
  }

  return context;
};
