import { capitalize } from 'lodash-es';
import { Game } from '@/types';
import { getDateFromCzechDate } from '@/utils';
import { DEFAULT_GROUP_TITLE } from './config';

export const getGroupGameByAdded =
  (resolvedLanguage: string): ((game: Game) => unknown) =>
  (game) => {
    const date = getDateFromCzechDate(game.added);

    if (date.getTime() === 0) {
      return DEFAULT_GROUP_TITLE;
    }

    return capitalize(date.toLocaleDateString(resolvedLanguage, { month: 'long', year: 'numeric' }));
  };
