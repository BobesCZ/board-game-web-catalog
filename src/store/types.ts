import { ReactNode } from 'react';
import { AppThemeType } from '@/theme/config';
import { Game } from '@/types';

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
