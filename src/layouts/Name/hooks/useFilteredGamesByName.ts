import { useMemo } from 'react';
import { filterGameByName } from '../utils';
import { NameFilters } from '../types';
import { Game } from '@/types';
import { useAppStore } from '@/store';

type Props = {
  filters: NameFilters;
};

type Return = {
  gameFilteredList: Game[];
  gameListOptions: string[];
};

export const useFilteredGamesByName = ({ filters }: Props): Return => {
  const { gameList } = useAppStore();

  const gameFilteredList = useMemo(() => {
    if ((filters.name?.length ?? 0) < 3) {
      return [];
    }

    return (gameList || []).filter((game) => filterGameByName(game, filters));
  }, [gameList, filters]);

  const gameListOptions = useMemo(() => (gameList || []).map(({ sourceName }) => sourceName), [gameList]);

  return { gameFilteredList, gameListOptions };
};
