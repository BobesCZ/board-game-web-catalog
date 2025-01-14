'use client';

import { Autocomplete, TextField } from '@mui/material';
import { ReactNode } from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { ControlleAutocompleteOption } from './types';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Pick<
  ControllerProps<TFieldValues>,
  'control'
> & {
  name: TName;
  options: ControlleAutocompleteOption[];
  label: string;
  noOptionsText: ReactNode;
};

export const ControlledAutocomplete = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  options,
  noOptionsText,
}: Props<TFieldValues, TName>) => (
  <Controller<TFieldValues>
    control={control}
    name={name}
    render={({ field: { ref, onChange, ...field } }) => (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        groupBy={(option) => option.groupLabel || ''}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(_, data) => onChange(data as any)}
        renderInput={(params) => <TextField {...field} {...params} fullWidth inputRef={ref} label={label} />}
        blurOnSelect
        multiple
        noOptionsText={noOptionsText}
      />
    )}
  />
);
