import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { ReactNode } from 'react';
import { GameListRecord } from '@/admin/actions';
import { Game } from '@/types';
import { MyBggData } from './hooks';

export type AppStoreValue = {
  gameList: Game[];
  activeGameListRecord: GameListRecord | undefined;
  myBggData: MyBggData | undefined;
  onMyBggDataChange: (username: string, bggCollectionGameList: BggCollectionGame[]) => void;
  onMyBggDataClear: () => void;
};

export type AppStoreProviderProps = Pick<AppStoreValue, 'activeGameListRecord'> & {
  children: ReactNode;
};
