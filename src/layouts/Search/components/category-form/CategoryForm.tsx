import { AccountCircle, Alarm, Group } from '@mui/icons-material';
import { Box, Button, Container, Grid, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import {
  ControlleAutocompleteOption,
  ControlledAutocomplete,
  ControlledSelect,
  ControlledSelectOption,
  Link,
} from '@/components';
import { Urls } from '@/config';
import { useAppStore } from '@/store';
import { CategoryFilters } from '../../types';

type Props = {
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
  langOptions: ControlledSelectOption<CategoryFilters, 'lang'>[];
  bggStatusOptions: ControlledSelectOption<CategoryFilters, 'bggStatus'>[];
};

export const CategoryForm = ({
  playersCountOptions,
  playingTimeOptions,
  categoryOptions,
  mechanicsOptions,
  langOptions,
  bggStatusOptions,
}: Props) => {
  const t = useTranslations();
  const { control } = useFormContext<CategoryFilters>();
  const { myBggData } = useAppStore();

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

              <Stack direction="row" alignItems="center" gap={3} flexWrap="wrap">
                <ControlledSelect<CategoryFilters, 'bggStatus'>
                  control={control}
                  name="bggStatus"
                  label={t('search.form.bggStatus.label')}
                  options={bggStatusOptions}
                  Icon={AccountCircle}
                  sx={{
                    width: 'auto',
                    flexGrow: 1,
                    '& .MuiSvgIcon-root': {
                      color: '#3f3a60',
                    },
                  }}
                />

                {!myBggData && (
                  <Button
                    component={Link}
                    variant="outlined"
                    size="large"
                    color="inherit"
                    startIcon={<AccountCircle sx={{ color: '#3f3a60' }} />}
                    sx={{
                      flexGrow: { xs: 1, sm: 0 },
                      flexShrink: 0,
                      height: 56,
                      color: '#3f3a60',
                      borderColor: '#3f3a60',
                    }}
                    href={Urls.MY_BGG}
                  >
                    {t('myBgg.addProfile')}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
