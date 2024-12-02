import { AppThemeType } from '@/theme/config';
import { Game } from '@/types';
import { ReactNode } from 'react';

export type AppStoreValue = {
  appTheme: AppThemeType;
  changeAppTheme: (id: string) => void;
  gameList: Game[];
  activeGameListRecord: number | undefined;
};

export type AppStoreProviderProps = {
  children: ReactNode;
  value: Pick<AppStoreValue, 'gameList' | 'activeGameListRecord'>;
};
