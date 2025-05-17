'use client';

import { Sync } from '@mui/icons-material';
import { Alert, Box, Button, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ControlledTextField } from '@/components';
import { useAppStore } from '@/store';
import { processCollectionGames } from '../../utils';
import { MyBggBenefits } from '../my-bgg-benefits';
import { MY_BGG_DEFAULT_VALUES } from './config';
import { MyBggForm } from './types';

export const CollectionLoader = () => {
  const t = useTranslations();
  const { onMyBggDataChange } = useAppStore();

  const methods = useForm<MyBggForm>({
    defaultValues: MY_BGG_DEFAULT_VALUES,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = async ({ username }: MyBggForm) => {
    if (!username?.length) return;

    setIsLoading(true);
    setHasError(false);

    const bggCollectionGameList = await processCollectionGames(username);

    if (bggCollectionGameList) {
      onMyBggDataChange(username, bggCollectionGameList);

      // Scroll to top after loading user profile
      window.scrollTo(0, 0);
    } else {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <MyBggBenefits />

        <Box mb={2}>
          <Typography variant="h3" textAlign="center">
            {t('myBgg.bggLoader')}
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="body2" gutterBottom>
            {t('myBgg.infoText1')}
          </Typography>
          <Typography variant="body2">{t('myBgg.infoText2')}</Typography>
        </Box>

        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(handleLoad)}>
            <Stack alignItems="center" gap={3}>
              <ControlledTextField<MyBggForm, 'username'>
                control={methods.control}
                name="username"
                label={t('myBgg.form.username.label')}
              />

              {hasError && (
                <Alert severity="error" sx={{ width: '100%' }}>
                  <Typography>{t('myBgg.usernameError')} </Typography>
                </Alert>
              )}

              {!isLoading ? (
                <Button type="submit" variant="contained" color="primary" disabled={isLoading} startIcon={<Sync />}>
                  {t('myBgg.loadButton')}
                </Button>
              ) : (
                <Stack direction="row" alignItems="center" gap={3}>
                  <Box position="relative" height="100%" flexGrow={1}>
                    <LinearProgress value={0} variant="determinate" color="success" sx={{ width: 180, height: 40 }} />
                    <LinearProgress
                      variant="indeterminate"
                      color="success"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.2,
                      }}
                    />
                  </Box>
                </Stack>
              )}
            </Stack>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};
