'use client';

import { Box, Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useFilteredGamesByName } from './hooks';
import { PageTitle, GameList, usePagination, Pagination } from '@/components';
import { NAME_DEFAULT_VALUES, NAME_URL_QUERY } from './config';
import { NameFilters } from './types';
import { NameForm } from './components';
import { useSearchParams } from 'next/navigation';

export default function Name() {
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
      <PageTitle i18nKey="name.pageTitle" dense />
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
