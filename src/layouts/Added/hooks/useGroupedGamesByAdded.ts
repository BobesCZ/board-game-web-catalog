import { groupBy, orderBy } from 'lodash-es';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { GameGroupedList } from '@/components';
import { useAppStore } from '@/store';
import { orderGameByAdded } from '@/utils';
import { DEFAULT_GROUP_TITLE } from './config';
import { getGroupGameByAdded } from './utils';

type Return = {
  gameGroupedList: GameGroupedList;
};

export const useGroupedGamesByAdded = (): Return => {
  const { gameList } = useAppStore();
  const locale = useLocale();

  const t = useTranslations();

  const gameGroupedList = useMemo(() => {
    const orderedList = orderBy(gameList || [], orderGameByAdded, 'desc');
    const groupedList = groupBy(orderedList, getGroupGameByAdded(locale));
    delete groupedList[DEFAULT_GROUP_TITLE];

    return groupedList;
  }, [gameList, locale]);

  return {
    gameGroupedList,
  };
};
