import { ChangeEvent } from 'react';
import { GameGroupedList } from '@/components';
import { Game } from '@/types';

export type UsePaginationReturn = {
  currentPageGameList: Game[];
  showPagination: boolean;
  currentPage: number;
  pageCount: number;
  handlePageChange: (event: ChangeEvent<unknown>, value: number) => void;
  showMoreButton: boolean;
  showMoreButtonCount: number;
  handleMoreButton: () => void;
};

export type UseGroupedPaginationReturn = Omit<UsePaginationReturn, 'currentPageGameList'> & {
  currentPageGameGroupedList: GameGroupedList;
};
