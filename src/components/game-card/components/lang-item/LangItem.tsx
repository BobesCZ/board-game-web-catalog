import { Language } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CircleFlag } from 'react-circle-flags';
import { Lang } from '@/types';
import { COUNTRY_FLAG_BY_LANG } from './config';

type Props = {
  lang: Lang;
};

export const LangItem = ({ lang }: Props) => {
  const t = useTranslations();

  if (lang === Lang.All) return null;

  return (
    <Tooltip arrow enterTouchDelay={100} title={t(`gameCard.langs.${lang.toLowerCase()}`)}>
      <Box display="inline-flex">
        {lang === Lang.Irrelevant ? (
          <Language color="success" fontSize="small" />
        ) : (
          <CircleFlag countryCode={COUNTRY_FLAG_BY_LANG[lang]} width={18} height={18} title={' '} />
        )}
      </Box>
    </Tooltip>
  );
};
