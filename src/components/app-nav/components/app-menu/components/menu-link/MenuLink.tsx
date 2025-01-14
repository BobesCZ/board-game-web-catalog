import { Launch } from '@mui/icons-material';
import { ListItem, ListItemButton, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link, LinkProps } from '@/components';

type Props = {
  to: LinkProps['href'];
  i18nKey: string;
  external?: boolean;
};

export const MenuLink = ({ to, i18nKey, external }: Props) => {
  const t = useTranslations();

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link href={to} underline="none" color="text.primary" sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            {t(i18nKey)}
            {external && <Launch fontSize="inherit" sx={{ mb: 0.5 }} />}
          </Stack>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};
