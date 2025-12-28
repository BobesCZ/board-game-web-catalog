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
  MY_BGG = 'MyBgg',
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

export const SecretVariablesKeys = {
  GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
  NEXTAUTH_SECRET: 'NEXTAUTH_SECRET',
  NEXTAUTH_URL: 'NEXTAUTH_URL',
  DATABASE_URL: 'DATABASE_URL',
  BGG_API_TOKEN: 'BGG_API_TOKEN',
} as const;

export type SecretVariablesCheck = Record<keyof typeof SecretVariablesKeys, boolean>;
