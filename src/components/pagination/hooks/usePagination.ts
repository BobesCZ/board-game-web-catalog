'use client';

import { ChangeEvent, MutableRefObject, useCallback, useMemo, useState } from 'react';
import { Game } from '@/types';
import { PAGINATION_ITEMS_COUNT } from '../config';
import { UsePaginationReturn } from './types';

type Props = {
  gameFilteredList: Game[];
  ref: MutableRefObject<HTMLDivElement | null>;
};

export const usePagination = ({ gameFilteredList, ref }: Props): UsePaginationReturn => {
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
      return [0, currentMoreButtonPage * PAGINATION_ITEMS_COUNT];
    }

    const firstPageIndex = (currentPage - 1) * PAGINATION_ITEMS_COUNT;

    return [firstPageIndex, firstPageIndex + PAGINATION_ITEMS_COUNT];
  }, [currentPage, currentMoreButtonPage]);

  const currentPageGameList = useMemo(
    () => gameFilteredList.slice(...getSliceIndexes()),
    [gameFilteredList, getSliceIndexes],
  );

  const pageCount = useMemo(() => Math.ceil(gameFilteredList.length / PAGINATION_ITEMS_COUNT), [gameFilteredList]);

  const hasSecondPage = gameFilteredList.length > PAGINATION_ITEMS_COUNT;
  const showPagination = hasSecondPage && currentMoreButtonPage < 2;
  const showMoreButton = hasSecondPage && currentPage < 2 && currentMoreButtonPage < pageCount;
  const showMoreButtonCount = Math.min(
    gameFilteredList.length - currentMoreButtonPage * PAGINATION_ITEMS_COUNT,
    PAGINATION_ITEMS_COUNT,
  );

  return {
    currentPageGameList,
    showPagination,
    currentPage,
    pageCount,
    handlePageChange,
    showMoreButton,
    showMoreButtonCount,
    handleMoreButton,
  };
};
