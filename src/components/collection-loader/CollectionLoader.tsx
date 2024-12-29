'use client';

import { Alert, Box, Button, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { Sync } from '@mui/icons-material';
import { processCollection } from './processCollection';
import { useMyBggCollection } from './useMyBggCollection';
import { useTranslations } from 'next-intl';
import { MyBggForm } from './types';
import { FormProvider, useForm } from 'react-hook-form';
import { MY_BGG_DEFAULT_VALUES } from './config';
import { ControlledTextField } from '../form';

export const CollectionLoader = () => {
  const t = useTranslations();
  const { onMyBggCollectionChange } = useMyBggCollection();

  const methods = useForm<MyBggForm>({
    defaultValues: MY_BGG_DEFAULT_VALUES,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = async ({ username }: MyBggForm) => {
    if (!username?.length) return;

    setIsLoading(true);
    setHasError(false);

    const result = await processCollection(username);

    if (result) {
      const collection = {
        created: Date.now(),
        username,
        collectionGameList: result,
      };
      onMyBggCollectionChange(collection);
    } else {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Box mb={3}>
          <Typography variant="h3" textAlign="center" gutterBottom>
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
