'use client';

import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { AppTabs, GameListGrouped, PageTitle, Pagination, useGroupedPagination } from '@/components';
import { useGroupedGamesByAdded } from './hooks';

export default function Added() {
  const ref = useRef<HTMLDivElement>(null);

  const { gameGroupedList } = useGroupedGamesByAdded();
  const { currentPageGameGroupedList, ...paginationProps } = useGroupedPagination({ gameGroupedList, ref });

  return (
    <>
      <PageTitle i18nKey="added.pageTitle" />
      <AppTabs />

      <Container>
        <Box ref={ref}>
          <GameListGrouped gameGroupedList={currentPageGameGroupedList} />
          <Pagination {...paginationProps} isGrouped />
        </Box>
      </Container>
    </>
  );
}
