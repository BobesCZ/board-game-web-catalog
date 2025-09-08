'use client';

import { Search } from '@mui/icons-material';
import { Autocomplete, AutocompleteProps, Box, ListItemProps, TextField, createFilterOptions } from '@mui/material';
import { useTranslations } from 'next-intl';
import { SyntheticEvent, useState } from 'react';
import { WebEventType, createWebEventRecord } from '@/admin/actions';
import { MIN_CHARACTERS_TO_SEARCH, NAME_URL_QUERY, Urls } from '@/config';
import { useRouter } from '@/navigation';
import { useAppStore } from '@/store';
import { Game } from '@/types';
import { AutocompleteOption } from '../autocomplete-option';

type Props = { handleDrawerClose?: () => void };

export const SearchInput = ({ handleDrawerClose }: Props) => {
  const t = useTranslations();
  const { gameList } = useAppStore();
  const { push } = useRouter();

  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const getOptionLabel = (option: string | Game) => (typeof option === 'string' ? option : option.sourceName);

  const filterOptions = createFilterOptions<Game>({
    stringify: ({ sourceName, primaryName }) => sourceName + primaryName,
  });

  const handleChange = (_e: SyntheticEvent, newValue: string | Game) => {
    const query = getOptionLabel(newValue);

    if (!query.length) return;

    const webEvent = { type: WebEventType.SEARCH, place: 'SearchInput', data: { inputValue, query } };
    createWebEventRecord(webEvent);

    const params = new URLSearchParams();
    params.set(NAME_URL_QUERY, query);

    const url = `${Urls.NAME}?${params}`;
    push(url);
  };

  const handleBlur = () => {
    if (!inputValue.length) return;

    const webEvent = { type: WebEventType.SEARCH, place: 'SearchInput', data: { inputValue } };
    createWebEventRecord(webEvent);
  };

  const handleInputChange = (_e: SyntheticEvent, newValue: string) => {
    setInputValue(newValue);
    setOpen(newValue.length >= MIN_CHARACTERS_TO_SEARCH);
  };

  const handleKeyDown: AutocompleteProps<Game, false, true, true>['onKeyDown'] = (event) => {
    if (event.key === 'Enter' && handleDrawerClose) {
      event.preventDefault();
      handleDrawerClose();
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.palette.secondary.light, borderRadius: '4px' })}>
      <Autocomplete<Game, false, true, true>
        freeSolo
        disableClearable
        sx={(theme) => ({ [theme.breakpoints.up('md')]: { width: 320 } })}
        size="small"
        color="white"
        forcePopupIcon={false}
        options={gameList ?? []}
        getOptionLabel={getOptionLabel}
        filterOptions={filterOptions}
        open={open}
        onChange={handleChange}
        onBlur={handleBlur}
        onInputChange={handleInputChange}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
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
              '&.MuiTextField-root': {
                '&, &:hover, .Mui-focused': { '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' } },
              },
              [theme.breakpoints.up('md')]: { width: 452 },
            })}
          />
        )}
        componentsProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] } }}
        renderOption={(props, option, { inputValue }) => {
          const { key, ...itemProps } = props as ListItemProps;

          return <AutocompleteOption key={key} props={itemProps} option={option} inputValue={inputValue} />;
        }}
      />
    </Box>
  );
};
