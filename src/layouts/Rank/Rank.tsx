'use client';

import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RANK_DEFAULT_VALUES } from './config';
import { RankForm } from './components';
import { RankFilters } from './types';
import { useFilteredGamesByRank } from './hooks';
import { PageTitle, GameList, usePagination, Pagination, AppTabs } from '@/components';

export default function Rank() {
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
