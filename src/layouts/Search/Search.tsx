'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { AppTabs, GameList, PageTitle, Pagination, usePagination } from '@/components';
import { FormProvider, useForm } from 'react-hook-form';
import { CategoryFilters } from './types';
import { CATEGORY_DEFAULT_VALUES } from './config';
import { useRef } from 'react';
import { useFilteredGamesByCategory } from './hooks';
import { CategoryForm, OrderingSelect } from './components';

export default function Search() {
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
