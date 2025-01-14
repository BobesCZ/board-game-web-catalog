'use client';

import { Box, Container } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AppTabs, GameList, PageTitle, Pagination, usePagination } from '@/components';
import { NAME_URL_QUERY } from '@/config';
import { NameForm } from './components';
import { NAME_DEFAULT_VALUES } from './config';
import { useFilteredGamesByName } from './hooks';
import { NameFilters } from './types';

export function Name() {
  const searchParams = useSearchParams();
  const searchParamsParsed = new URLSearchParams(searchParams);
  const query = searchParamsParsed.get(NAME_URL_QUERY);

  const methods = useForm<NameFilters>({
    defaultValues: NAME_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList } = useFilteredGamesByName({ filters });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  useEffect(() => {
    if (query) {
      methods.setValue('name', query);
    }
  }, [methods, query]);

  return (
    <>
      <PageTitle i18nKey="name.pageTitle" />
      <AppTabs />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <NameForm />
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
