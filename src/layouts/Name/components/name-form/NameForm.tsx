import { Box, Container, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@/components';
import { NameFilters } from '../../types';

export const NameForm = () => {
  const t = useTranslations();
  const { control } = useFormContext<NameFilters>();

  return (
    <Box py={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12}>
            <ControlledTextField<NameFilters, 'name'> control={control} name="name" label={t('name.form.name.label')} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
