import { useMemo } from 'react';
import { filterGameByName } from '../utils';
import { NameFilters } from '../types';
import { Game } from '@/types';
import { useAppStore } from '@/store';
import { MIN_CHARACTERS_TO_SEARCH } from '@/config';

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
    if ((filters.name?.length ?? 0) < MIN_CHARACTERS_TO_SEARCH) {
      return [];
    }

    return (gameList || []).filter((game) => filterGameByName(game, filters));
  }, [gameList, filters]);

  const gameListOptions = useMemo(() => (gameList || []).map(({ sourceName }) => sourceName), [gameList]);

  return { gameFilteredList, gameListOptions };
};
