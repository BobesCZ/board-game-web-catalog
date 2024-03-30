'use client';

import { useRouter } from 'next/navigation';
import { Autocomplete, Box, ListItemProps, TextField, createFilterOptions } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Search } from '@mui/icons-material';
import { Game } from '@/types';
import { Urls } from '@/config';
import { NAME_URL_QUERY } from '@/layouts/Name/config';
import { MIN_CHARACTERS_TO_OPEN } from './config';
import { AutocompleteOption } from '../autocomplete-option';
import { useAppStore } from '@/store';
import { useTranslations } from 'next-intl';

export const SearchInput = () => {
  const t = useTranslations();
  const { gameList } = useAppStore();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const getOptionLabel = (option: string | Game) => (typeof option === 'string' ? option : option.sourceName);

  const filterOptions = createFilterOptions<Game>({
    stringify: ({ sourceName, primaryName }) => sourceName + primaryName,
  });

  const handleChange = (_e: SyntheticEvent, newValue: string | Game) => {
    const query = getOptionLabel(newValue);

    if (!!query.length) {
      const params = new URLSearchParams();
      params.set(NAME_URL_QUERY, query);

      const url = `${Urls.NAME}?${params}`;
      push(url);
    }
  };

  const handleInputChange = (_e: SyntheticEvent, newValue: string) =>
    setOpen(newValue.length >= MIN_CHARACTERS_TO_OPEN);

  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={(theme) => ({ backgroundColor: theme.palette.secondary.light, borderRadius: theme.shape.borderRadius / 4 })}
    >
      <Autocomplete<Game, false, true, true>
        freeSolo
        disableClearable
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: { width: 320 },
        })}
        size="small"
        color="white"
        forcePopupIcon={false}
        options={gameList ?? []}
        getOptionLabel={getOptionLabel}
        filterOptions={filterOptions}
        open={open}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onClose={handleClose}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t('searchBar')}
            hiddenLabel
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: <Search />,
              sx: {
                'input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration':
                  { display: 'none' },
              },
            }}
            sx={(theme) => ({
              '&.MuiTextField-root .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              [theme.breakpoints.up('md')]: { width: 452 },
            })}
          />
        )}
        componentsProps={{
          popper: {
            modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
          },
        }}
        renderOption={(props, option, { inputValue }) => {
          const { key, ...itemProps } = props as ListItemProps;

          return <AutocompleteOption key={key} props={itemProps} option={option} inputValue={inputValue} />;
        }}
      />
    </Box>
  );
};
