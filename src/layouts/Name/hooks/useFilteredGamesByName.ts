import { useMemo } from 'react';
import { MIN_CHARACTERS_TO_SEARCH } from '@/config';
import { useAppStore } from '@/store';
import { Game } from '@/types';
import { NameFilters } from '../types';
import { filterGameByName } from '../utils';

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
