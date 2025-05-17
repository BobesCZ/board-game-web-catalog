import { ControlleAutocompleteOption } from '@/components';
import { GameOrdering, GamePlayingTimeType, Lang, MyBggCollection } from '@/types';

export type PlayersCount = 0 | 1 | 2 | 200 | 3 | 4 | 5 | 6 | 7;

export type CategoryFilters = {
  playersCount: PlayersCount;
  playingTime: `${GamePlayingTimeType}`;
  categories: ControlleAutocompleteOption[];
  mechanics: ControlleAutocompleteOption[];
  lang: `${Lang}`;
  ordering: `${GameOrdering}`;
  bggStatus: `${MyBggCollection}`;
};

export enum CategoryGroup {
  Favourites = 'favourites',
  Topics = 'topics',
  Other = 'other',
}

export enum MechanicGroup {
  Favourites = 'favourites',
  Other = 'other',
}
