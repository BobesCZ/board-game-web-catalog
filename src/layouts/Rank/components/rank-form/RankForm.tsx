import { Group } from '@mui/icons-material';
import { Box, Container, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { ControlledSelect, ControlledSelectOption } from '@/components';
import { RankFilters } from '../../types';

type Props = {
  rankNameOptions: ControlledSelectOption<RankFilters, 'rankName'>[];
};

export const RankForm = ({ rankNameOptions }: Props) => {
  const t = useTranslations();
  const { control } = useFormContext<RankFilters>();

  return (
    <Box pt={4} pb={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <ControlledSelect<RankFilters, 'rankName'>
              control={control}
              name="rankName"
              label={t('rank.form.rankName.label')}
              options={rankNameOptions}
              Icon={Group}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
