import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { FooterLink } from './components';
import { useTranslations } from 'next-intl';
import { Urls } from '@/config';
import { Link } from '../Link';
import { useAppStore } from '@/store';

export const AppFooter = () => {
  const t = useTranslations();
  const { gameList, activeGameListRecord } = useAppStore();
  const gamesCount = gameList?.length;
  const recordCreated = activeGameListRecord;

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.palette.secondary.dark })}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Box mb={2.5}>
            <Typography variant="h3" color="secondary.main">
              {t('meta.title')}
            </Typography>
          </Box>

          <Grid container columnSpacing={3}>
            <Grid item lg={6}>
              <Stack alignItems="flex-start" gap={1}>
                <FooterLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
                <FooterLink to={Urls.NAME} i18nKey="name.pageTitle" />
              </Stack>
            </Grid>
            <Grid item lg={6}>
              <Stack alignItems="flex-start" gap={1}>
                <FooterLink to={Urls.RANK} i18nKey="rank.pageTitle" />
                <FooterLink to={Urls.EXTERNAL_CLIENT} i18nKey="footer.goToClient" external />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Stack alignItems="center" sx={{ display: { lg: 'none' } }}>
          <Stack alignItems="flex-start" gap={1.5}>
            <Box mb={1}>
              <Typography variant="h3" color="secondary.main">
                {t('meta.title')}
              </Typography>
            </Box>

            <FooterLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
            <FooterLink to={Urls.NAME} i18nKey="name.pageTitle" />
            <FooterLink to={Urls.RANK} i18nKey="rank.pageTitle" />
            <FooterLink to={Urls.EXTERNAL_CLIENT} i18nKey="footer.goToClient" external />
          </Stack>
        </Stack>
      </Container>

      {(gamesCount || recordCreated) && (
        <>
          <Divider />

          <Typography variant="body2" color="secondary.main" textAlign="center" my={2}>
            {gamesCount && t('footer.gamesCount', { gamesCount })}
            {recordCreated &&
              ' ' +
                t('footer.recordCreated', { recordCreated: new Date(recordCreated ?? 0).toLocaleDateString() })}{' '}
            {t('footer.createdBy')}{' '}
            <Link color="secondary.main" href="https://github.com/BobesCZ" target="_blank">
              Bobeš
            </Link>
            .
          </Typography>
        </>
      )}
    </Box>
  );
};
