import { Launch } from '@mui/icons-material';
import { Link, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Urls } from '@/config';
import { Game } from '@/types';
import { parseName } from './utils';

type Props = Pick<Game, 'sourceName'>;

export const ZhLink = ({ sourceName }: Props) => {
  const t = useTranslations();

  return (
    <Link
      display="inline-block"
      variant="body1"
      color="text.secondary"
      href={`${Urls.EXTERNAL_ZH}?fType=ftx&keyword=${parseName(sourceName)}`}
      target="_blank"
    >
      <Stack direction="row" alignItems="center" gap={0.5}>
        {t('gameCard.goToZh')}
        <Launch fontSize="inherit" />
      </Stack>
    </Link>
  );
};
