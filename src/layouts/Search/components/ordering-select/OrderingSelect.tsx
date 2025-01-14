import { Sort } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledSelect, ControlledSelectOption } from '@/components';
import { CategoryFilters } from '../../types';

type Props = {
  orderingOptions: ControlledSelectOption<CategoryFilters, 'ordering'>[];
};

export const OrderingSelect = ({ orderingOptions }: Props) => {
  const { control } = useFormContext<CategoryFilters>();

  return (
    <Stack direction="row" justifyContent="flex-end" mt={2} mb={-3}>
      <ControlledSelect<CategoryFilters, 'ordering'>
        control={control}
        name="ordering"
        label=""
        options={orderingOptions}
        variant="standard"
        size="small"
        fullWidth={false}
        sx={{
          '.MuiInput-root:before': {
            display: 'none',
          },
          '.MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart': {
            pr: 3.5,
            pb: 0.25,
          },
        }}
        Icon={Sort}
      />
    </Stack>
  );
};
