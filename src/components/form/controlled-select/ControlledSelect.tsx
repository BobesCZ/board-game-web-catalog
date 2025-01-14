'use client';

import { SvgIconComponent } from '@mui/icons-material';
import { InputAdornment, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { ControlledSelectOption } from './types';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Pick<
  ControllerProps<TFieldValues>,
  'control'
> &
  Pick<TextFieldProps, 'variant' | 'size' | 'fullWidth' | 'sx'> & {
    name: TName;
    options: ControlledSelectOption<TFieldValues, TName>[];
    label: string;
    Icon?: SvgIconComponent;
  };

export const ControlledSelect = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  options,
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  Icon,
  sx,
}: Props<TFieldValues, TName>) => (
  <Controller<TFieldValues>
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        select
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        sx={sx}
        InputProps={
          Icon && {
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small" sx={{ mb: 0.5 }} />
              </InputAdornment>
            ),
          }
        }
      >
        {options.map(({ value, label }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);
