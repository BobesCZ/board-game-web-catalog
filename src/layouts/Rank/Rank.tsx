'use client';

import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AppTabs, GameList, PageTitle, Pagination, usePagination } from '@/components';
import { RankForm } from './components';
import { RANK_DEFAULT_VALUES } from './config';
import { useFilteredGamesByRank } from './hooks';
import { RankFilters } from './types';

export function Rank() {
  const methods = useForm<RankFilters>({
    defaultValues: RANK_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, ...options } = useFilteredGamesByRank({
    filters,
  });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <>
      <PageTitle i18nKey="rank.pageTitle" />
      <AppTabs />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <RankForm {...options} />
          <Container>
            <Box ref={ref}>
              <GameList gameList={currentPageGameList} gameTotalCount={gameFilteredList.length} />
              <Pagination {...paginationProps} />
            </Box>
          </Container>
        </Box>
      </FormProvider>
    </>
  );
}
