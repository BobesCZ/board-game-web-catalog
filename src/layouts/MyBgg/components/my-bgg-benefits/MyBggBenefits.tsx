'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import imageFilters from './assets/myBgg_screen_filters.jpg';
import imageRating from './assets/myBgg_screen_rating.jpg';

export const MyBggBenefits = () => {
  const t = useTranslations();

  return (
    <>
      <Box mb={2}>
        <Typography variant="h3" textAlign="center">
          {t('myBgg.benefits.title')}
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
          <li>
            {t('myBgg.benefits.rating')}
            <Image alt="logo" src={imageRating} style={{ display: 'block', margin: '8px 0 16px' }} />
          </li>
          <li>{t('myBgg.benefits.filters1')}</li>
          <li>{t('myBgg.benefits.filters2')}</li>
          <Image alt="logo" src={imageFilters} style={{ display: 'block', margin: '8px 0' }} />
        </Typography>
      </Box>
    </>
  );
};
