import { ReactNode } from 'react';
import { Game } from '@/types';

export type AppStoreValue = {
  gameList: Game[];
  activeGameListRecord: number | undefined;
};

export type AppStoreProviderProps = {
  children: ReactNode;
  value: AppStoreValue;
};
