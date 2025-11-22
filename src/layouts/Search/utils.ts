import { CategoryKey, MechanicKey } from '@/bgg/data';
import { Game, Lang, MyBggCollection } from '@/types';
import { CATEGORY_PLAYING_TIME_INTERVALS } from './config';
import { CategoryFilters } from './types';

const hasPlayersCount = (game: Game, { playersCount }: CategoryFilters): boolean => {
  switch (playersCount) {
    case 0:
      // Case: allow all options
      return true;

    case 200:
      // Case: game exactly for two players
      return game.minplayers === 2 && game.maxplayers === 2;

    default:
      return playersCount >= (game.minplayers || 0) && playersCount <= (game.maxplayers || 0);
  }
};

const hasPlayingTime = (game: Game, { playingTime }: CategoryFilters): boolean => {
  const { min, max } = CATEGORY_PLAYING_TIME_INTERVALS[playingTime];

  return (game.playingtime || 0) >= min && (game.playingtime || 0) <= max;
};

const hasCategories = (game: Game, { categories }: CategoryFilters): boolean =>
  categories.every((item) => game?.categories?.includes(item.value as CategoryKey));

const hasMechanics = (game: Game, { mechanics }: CategoryFilters): boolean =>
  mechanics.every((item) => game?.mechanics?.includes(item.value as MechanicKey));

const hasLangs = (game: Game, { lang }: CategoryFilters): boolean => {
  if (lang === Lang.All) return true;

  if (game.langs?.includes(Lang.Irrelevant)) return true;

  return !!game.langs?.includes(lang as Lang);
};

export const hasStatus = (game: Game, { bggStatus }: CategoryFilters): boolean => {
  switch (bggStatus) {
    case MyBggCollection.ALL:
      return true;

    case MyBggCollection.RATED:
      return !!game.myBggStatus?.userRating;

    case MyBggCollection.UNRATED:
      return !game.myBggStatus?.userRating;

    case MyBggCollection.WANTTOBUY:
    case MyBggCollection.WANTTOPLAY:
    case MyBggCollection.WISHLIST:
      return !!game.myBggStatus?.collections.includes(bggStatus);
  }

  return false;
};

export const filterGamebyCategory = (game: Game, filters: CategoryFilters): boolean =>
  hasPlayersCount(game, filters) &&
  hasPlayingTime(game, filters) &&
  hasCategories(game, filters) &&
  hasMechanics(game, filters) &&
  hasLangs(game, filters) &&
  hasStatus(game, filters);
