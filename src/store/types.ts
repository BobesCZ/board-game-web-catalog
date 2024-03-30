import { Game } from '@/types';
import { ReactNode } from 'react';

export type AppStoreValue = {
  gameList: Game[];
  activeGameListRecord: number | undefined;
};

export type AppStoreProviderProps = {
  children: ReactNode;
  value: AppStoreValue;
};
