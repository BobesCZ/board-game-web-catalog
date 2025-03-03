import { ReactNode } from 'react';
import { GameListRecord } from '@/admin/actions';
import { Game } from '@/types';

export type AppStoreValue = {
  gameList: Game[];
  activeGameListRecord: GameListRecord | undefined;
};

export type AppStoreProviderProps = {
  children: ReactNode;
  value: AppStoreValue;
};
