import { Alarm, Group } from '@mui/icons-material';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import {
  ControlleAutocompleteOption,
  ControlledAutocomplete,
  ControlledSelect,
  ControlledSelectOption,
} from '@/components';
import { CategoryFilters } from '../../types';

type Props = {
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
  langOptions: ControlledSelectOption<CategoryFilters, 'lang'>[];
};

export const CategoryForm = ({
  playersCountOptions,
  playingTimeOptions,
  categoryOptions,
  mechanicsOptions,
  langOptions,
}: Props) => {
  const t = useTranslations();
  const { control } = useFormContext<CategoryFilters>();

  return (
    <Box py={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={6}>
          <Grid item xs={12} md={6}>
            <Stack gap={3}>
              <ControlledSelect<CategoryFilters, 'playersCount'>
                control={control}
                name="playersCount"
                label={t('search.form.playersCount.label')}
                options={playersCountOptions}
                Icon={Group}
              />

              <ControlledSelect<CategoryFilters, 'playingTime'>
                control={control}
                name="playingTime"
                label={t('search.form.playingTime.label')}
                options={playingTimeOptions}
                Icon={Alarm}
              />

              <ControlledSelect<CategoryFilters, 'lang'>
                control={control}
                name="lang"
                label={t('search.form.lang.label')}
                options={langOptions}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack gap={3}>
              <ControlledAutocomplete<CategoryFilters, 'categories'>
                control={control}
                name="categories"
                label={t('search.form.categories.label')}
                options={categoryOptions}
                noOptionsText={t('common.noOptionsText')}
              />

              <ControlledAutocomplete<CategoryFilters, 'mechanics'>
                control={control}
                name="mechanics"
                label={t('search.form.mechanics.label')}
                options={mechanicsOptions}
                noOptionsText={t('common.noOptionsText')}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
