import { CategoryKey, MechanicKey } from '@/bgg/data';
import { GameOrdering, GamePlayingTimeInterval, GamePlayingTimeType, Lang, MyBggCollection } from '@/types';
import { CategoryFilters, CategoryGroup, MechanicGroup } from './types';

export const CATEGORY_DEFAULT_VALUES: CategoryFilters = {
  playersCount: 2,
  playingTime: GamePlayingTimeType.FILLER,
  categories: [],
  mechanics: [],
  lang: Lang.All,
  ordering: GameOrdering.RATING,
  bggStatus: MyBggCollection.ALL,
};

export const CATEGORY_PLAYING_TIME_INTERVALS: Record<GamePlayingTimeType, GamePlayingTimeInterval> = {
  [GamePlayingTimeType.ALL]: { min: 0, max: 9999 },
  [GamePlayingTimeType.FILLER]: { min: 1, max: 20 },
  [GamePlayingTimeType.SHORT]: { min: 21, max: 59 },
  [GamePlayingTimeType.MEDIUM]: { min: 60, max: 90 },
  [GamePlayingTimeType.LONG]: { min: 91, max: 9999 },
};

export const GROUPED_CATEGORIES: Partial<Record<CategoryGroup, CategoryKey[]>> = {
  favourites: ['actionDexterity', 'bluffing', 'cardGame', 'childrensGame', 'humor', 'partyGame', 'trivia'],
  topics: [
    'popculture',
    'animals',
    'arabian',
    'aviationFlight',
    'environmental',
    'fantasy',
    'mafia',
    'math',
    'medical',
    'music',
    'mythology',
    'nautical',
    'pirates',
    'political',
    'religious',
    'scienceFiction',
    'spaceExploration',
    'spiesSecretAgents',
    'sports',
    'trains',
    'zombies',
  ],
};

export const GROUPED_MECHANICS: Partial<Record<MechanicGroup, MechanicKey[]>> = {
  favourites: ['areaMajorityInfluence', 'cooperativeGame', 'deckBagAndPoolBuilding', 'pushYourLuck', 'rolePlaying'],
};
