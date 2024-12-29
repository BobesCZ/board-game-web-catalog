import { orderBy } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { ControlledSelectOption } from '@/components';
import { useAppStore } from '@/store';
import { Game } from '@/types';
import { RankFilters } from '../types';
import { filterGamebyRank, getOrderGameByRank } from '../utils';
import { getRankNameOptions } from './utils';

type Props = {
  filters: RankFilters;
};

type Return = {
  gameFilteredList: Game[];
  rankNameOptions: ControlledSelectOption<RankFilters, 'rankName'>[];
};

export const useFilteredGamesByRank = ({ filters }: Props): Return => {
  const t = useTranslations();
  const { gameList } = useAppStore();

  const gameFilteredList = useMemo(() => {
    const list = (gameList || []).filter((game) => filterGamebyRank(game, filters));

    return orderBy(list, getOrderGameByRank(filters), 'asc');
  }, [gameList, filters]);

  const rankNameOptions = useMemo(() => getRankNameOptions(t), [t]);

  return {
    gameFilteredList,
    rankNameOptions,
  };
};
