import { Box, Container, Divider, Grid2, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Urls } from '@/config';
import { useAppStore } from '@/store';
import { Link } from '../Link';
import { FooterLink } from './components';

export const AppFooter = () => {
  const t = useTranslations();
  const { gameList, activeGameListRecord } = useAppStore();
  const gamesCount = gameList?.length;
  const recordCreated = activeGameListRecord?.created;

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.palette.secondary.dark })}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Box mb={2.5}>
            <Typography variant="h3" color="secondary.main">
              {t('meta.title')}
            </Typography>
          </Box>

          <Grid2 container columnSpacing={3}>
            <Grid2 size={{ lg: 6 }}>
              <Stack alignItems="flex-start" gap={1}>
                <FooterLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
                <FooterLink to={Urls.NAME} i18nKey="name.pageTitle" />
                <FooterLink to={Urls.RANK} i18nKey="rank.pageTitle" />
              </Stack>
            </Grid2>
            <Grid2 size={{ lg: 6 }}>
              <Stack alignItems="flex-start" gap={1}>
                <FooterLink to={Urls.ADDED} i18nKey="added.pageTitle" />
                <FooterLink to={Urls.MY_BGG} i18nKey="myBgg.pageTitle" />
                <FooterLink to={Urls.EXTERNAL_CLIENT} i18nKey="footer.goToClient" external />
              </Stack>
            </Grid2>
          </Grid2>
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
            <FooterLink to={Urls.ADDED} i18nKey="added.pageTitle" />
            <FooterLink to={Urls.MY_BGG} i18nKey="myBgg.pageTitle" />
            <FooterLink to={Urls.EXTERNAL_CLIENT} i18nKey="footer.goToClient" external />
          </Stack>
        </Stack>
      </Container>

      {!!(gamesCount || recordCreated) && (
        <>
          <Divider />
          <Container maxWidth="md">
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
          </Container>
        </>
      )}
    </Box>
  );
};
