import { Box, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { DENSE_PADDING, STANDARD_PADDING } from './config';

type Props = {
  i18nKey: string;
  dense?: boolean;
};

export const PageTitle = ({ i18nKey, dense }: Props) => {
  const t = useTranslations();
  const { pt, pb, ptMobile, pbMobile } = dense ? DENSE_PADDING : STANDARD_PADDING;

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.light,
        p: theme.spacing(ptMobile, 0, pbMobile),
        [theme.breakpoints.up('lg')]: {
          p: theme.spacing(pt, 0, pb),
        },
      })}
    >
      <Container>
        <Typography variant="h1" textAlign="center">
          {t(i18nKey)}
        </Typography>
      </Container>
    </Box>
  );
};
