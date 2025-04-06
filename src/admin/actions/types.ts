import { Game } from '@/types';

export enum GameListRecordStatus {
  INCOMPLETED = 'incompleted',
  COMPLETED = 'completed',
}

export type GameListRecord = {
  recordId: number;
  created: Date;
  recordName: string;
  status: `${GameListRecordStatus}`;
  gameList: Game[];
  isActive: boolean;
};

export type GameListRecordItem = Omit<GameListRecord, 'gameList'> & {
  gameListCount: number;
};

export enum WebEventType {
  SEARCH = 'Search',
}

export type WebEventRecord = {
  recordId: number;
  created: Date;
  type: WebEventType;
  place: string;
  data: string;
};

export enum CacheTags {
  ACTIVE_GAMELIST = 'activeGameList',
  GAMELIST_RECORDS = 'gameListRecords',
}
