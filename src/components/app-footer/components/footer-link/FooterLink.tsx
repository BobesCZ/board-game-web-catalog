import { Launch } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link, LinkProps } from '@/components';

type Props = {
  to: LinkProps['href'];
  i18nKey: string;
  external?: boolean;
};

export const FooterLink = ({ to, i18nKey, external }: Props) => {
  const t = useTranslations();

  return (
    <Link href={to} underline="hover" color="secondary.main" target={external ? '_blank' : undefined}>
      <Stack direction="row" alignItems="center" gap={0.75}>
        {t(i18nKey)}
        {external && <Launch fontSize="inherit" sx={{ mb: 0.5 }} />}
      </Stack>
    </Link>
  );
};
