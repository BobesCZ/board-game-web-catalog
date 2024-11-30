import { Launch } from '@mui/icons-material';
import { Link, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Urls } from '@/config';
import { Game } from '@/types';

type Props = Pick<Game, 'id'>;

export const BggLink = ({ id }: Props) => {
  const t = useTranslations();

  return id ? (
    <Link
      display="inline-block"
      variant="body1"
      color="text.secondary"
      href={`${Urls.EXTERNAL_BGG}${id}`}
      target="_blank"
    >
      <Stack direction="row" alignItems="center" gap={0.5}>
        {t('gameCard.goToBgg')}
        <Launch fontSize="inherit" />
      </Stack>
    </Link>
  ) : null;
};
