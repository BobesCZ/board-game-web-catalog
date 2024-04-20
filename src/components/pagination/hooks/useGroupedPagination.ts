import { ChangeEvent, MutableRefObject, useCallback, useMemo, useState } from 'react';
import { PAGINATION_GROUPS_COUNT } from '../config';
import { UseGroupedPaginationReturn } from './types';
import { GameGroupedList } from '@/components/game-list';

type Props = {
  gameGroupedList: GameGroupedList;
  ref: MutableRefObject<HTMLDivElement | null>;
};

export const useGroupedPagination = ({ gameGroupedList, ref }: Props): UseGroupedPaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMoreButtonPage, setCurrentMoreButtonPage] = useState(1);

  const handlePageChange = useCallback(
    (_e: ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
      ref?.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [ref],
  );

  const handleMoreButton = () => setCurrentMoreButtonPage((prev) => prev + 1);

  const getSliceIndexes = useCallback(() => {
    if (currentMoreButtonPage > 1) {
      return [0, currentMoreButtonPage * PAGINATION_GROUPS_COUNT];
    }

    const firstPageIndex = (currentPage - 1) * PAGINATION_GROUPS_COUNT;

    return [firstPageIndex, firstPageIndex + PAGINATION_GROUPS_COUNT];
  }, [currentPage, currentMoreButtonPage]);

  const currentPageGameGroupedList = useMemo(() => {
    const [startIndex, endIndex] = getSliceIndexes();

    return Object.entries(gameGroupedList).reduce((res, [key, item], index) => {
      if (index < startIndex || index > endIndex - 1) return res;

      return { ...res, [key]: item };
    }, {});
  }, [gameGroupedList, getSliceIndexes]);

  const pageCount = useMemo(
    () => Math.ceil(Object.keys(gameGroupedList).length / PAGINATION_GROUPS_COUNT),
    [gameGroupedList],
  );

  const hasSecondPage = Object.keys(gameGroupedList).length > PAGINATION_GROUPS_COUNT;
  const showPagination = hasSecondPage && currentMoreButtonPage < 2;
  const showMoreButton = hasSecondPage && currentPage < 2 && currentMoreButtonPage < pageCount;
  const showMoreButtonCount = Math.min(
    Object.keys(gameGroupedList).length - currentMoreButtonPage * PAGINATION_GROUPS_COUNT,
    PAGINATION_GROUPS_COUNT,
  );

  return {
    currentPageGameGroupedList,
    showPagination,
    currentPage,
    pageCount,
    handlePageChange,
    showMoreButton,
    showMoreButtonCount,
    handleMoreButton,
  };
};
