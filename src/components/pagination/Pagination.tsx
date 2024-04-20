import { Button, Pagination as MuiPagination, Stack } from '@mui/material';
import { UsePaginationReturn } from './hooks';
import { useTranslations } from 'next-intl';

type Props = Omit<UsePaginationReturn, 'currentPageGameList'> & { isGrouped?: boolean };

export const Pagination = ({
  showPagination,
  currentPage,
  pageCount,
  handlePageChange,
  showMoreButton,
  showMoreButtonCount,
  handleMoreButton,
  isGrouped = false,
}: Props) => {
  const t = useTranslations();

  return showMoreButton || showPagination ? (
    <Stack alignItems="center" gap={3} mb={4}>
      {showMoreButton && (
        <Button variant="contained" size="large" onClick={handleMoreButton}>
          {t(`pagination.${isGrouped ? 'showMoreGroups' : 'showMore'}`, { itemsCount: showMoreButtonCount })}
        </Button>
      )}
      {showPagination && (
        <MuiPagination
          size="large"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={0}
          sx={{
            '.MuiPaginationItem-root': {
              lineHeight: 1,
            },
          }}
        />
      )}
    </Stack>
  ) : null;
};
