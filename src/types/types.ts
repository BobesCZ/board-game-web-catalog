import { BggGame, BggRank, BggThing } from '@code-bucket/board-game-geek';
import { useTranslations } from 'next-intl';
import { CategoryKey, MechanicKey, RankNameKey } from '@/bggData';

export type Rank = Pick<BggRank, 'value'> & {
  name: `${RankNameKey}`;
};

export type Rating = {
  value: number;
  usersCount: number;
};

export enum Lang {
  All = 'All',
  Irrelevant = 'Irrelevant',
  CZ = 'CZ',
  ENG = 'ENG',
  DE = 'DE',
}

export enum Status {
  NEW = 'new',
  FINISHED = 'finished',
  UNFINISHED = 'unfinished',
}

export enum MyBggCollection {
  ALL = 'all',
  RATED = 'rated',
  UNRATED = 'unrated',
  WANTTOBUY = 'wanttobuy',
  WANTTOPLAY = 'wanttoplay',
  WISHLIST = 'wishlist',
}

export type MyBggStatusCollection = MyBggCollection.WANTTOBUY | MyBggCollection.WANTTOPLAY | MyBggCollection.WISHLIST;

export type MyBggStatus = {
  collections: `${MyBggStatusCollection}`[];
  userRating: number | undefined;
};

export type Game = Partial<Pick<BggThing, 'id' | 'primaryName' | 'yearpublished' | 'image'>> &
  Partial<Pick<BggGame, 'playingtime' | 'minplayers' | 'maxplayers' | 'minage'>> & {
    uid: string;
    sourceName: string;
    status: `${Status}`;
    statusMessage?: string;
    notes?: string[];
    langs?: Lang[];
    location?: string;
    added?: string;
    categories?: CategoryKey[];
    mechanics?: MechanicKey[];
    averageRating?: Rating;
    averageWeight?: Rating;
    ranks?: Rank[];
    myBggStatus?: MyBggStatus;
  };

export enum GamePlayingTimeType {
  ALL = 'all',
  FILLER = 'filler',
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
}

export type GamePlayingTimeInterval = {
  min: number;
  max: number;
};

export enum GameOrdering {
  NAME = 'name',
  RATING = 'rating',
  WEIGHT = 'weight',
}

export enum LogRecordState {
  SUCCESS = 'success',
  SKIPPED = 'skipped',
  ERROR = 'error',
}

export type LogRecord = { sourceName: string; status: LogRecordState; statusMessage?: string };

export type TFunction = ReturnType<typeof useTranslations<string>>;

export enum LocaleLang {
  CS = 'cs',
  EN = 'en',
}
