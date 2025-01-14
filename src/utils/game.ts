import { Game } from '@/types';
import { getDateFromCzechDate } from '@/utils';

export const orderGameByRating: (game: Game) => unknown = (game) => game.averageRating?.value || 0;

export const orderGameByWeight: (game: Game) => unknown = (game) => game.averageWeight?.value || 0;

export const orderGameByAdded: (game: Game) => unknown = (game) => getDateFromCzechDate(game.added);
