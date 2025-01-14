import { MAX_RANK_LIMIT } from '@/config';
import { Game, Rank } from '@/types';
import { RankFilters } from './types';

const hasRank = (game: Game, { rankName }: RankFilters): boolean =>
  !!game.ranks?.find((rank: Rank) => rank.name === rankName && rank.value < MAX_RANK_LIMIT);

export const filterGamebyRank = (game: Game, filters: RankFilters): boolean => hasRank(game, filters);

export const getOrderGameByRank =
  ({ rankName }: RankFilters): ((game: Game) => unknown) =>
  (game) =>
    game?.ranks?.find((rank: Rank) => rank.name === rankName)?.value;
