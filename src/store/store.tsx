'use client';

import { createContext, useContext } from 'react';
import { AppStoreProviderProps, AppStoreValue } from './types';

const AppContext = createContext<AppStoreValue>({ gameList: [], activeGameListRecord: undefined });

export const AppStoreProvider = ({ children, value }: AppStoreProviderProps) => (
  <AppContext.Provider value={value}>{children}</AppContext.Provider>
);

export const useAppStore = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppStore must be used within a AppStoreProvider');
  }

  return context;
};
