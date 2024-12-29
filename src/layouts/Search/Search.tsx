'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AppTabs, GameList, PageTitle, Pagination, usePagination } from '@/components';
import { CategoryForm, OrderingSelect } from './components';
import { CATEGORY_DEFAULT_VALUES } from './config';
import { useFilteredGamesByCategory } from './hooks';
import { CategoryFilters } from './types';

export function Search() {
  const methods = useForm<CategoryFilters>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, orderingOptions, ...options } = useFilteredGamesByCategory({
    filters,
  });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <>
      <PageTitle i18nKey="search.pageTitle" />
      <AppTabs />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <CategoryForm {...options} />
          <Container>
            <Box ref={ref}>
              <OrderingSelect orderingOptions={orderingOptions} />
              <GameList gameList={currentPageGameList} gameTotalCount={gameFilteredList.length} />
              <Pagination {...paginationProps} />
            </Box>
          </Container>
        </Box>
      </FormProvider>
    </>
  );
}
