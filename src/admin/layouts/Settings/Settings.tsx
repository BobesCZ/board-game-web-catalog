'use client';

import { Upload } from '@mui/icons-material';
import { Box, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, ChangeEventHandler, useState, useTransition } from 'react';
import { GameListRecord, SecretVariablesCheck, createGameListRecord } from '@/admin/actions';
import { useUserAuthContext } from '@/admin/components';
import { AdministrationSettings, ProjectSettings } from '@/admin/layouts/Settings/components';
import { ButtonAction, VisuallyHiddenInput, processFileUpload } from '@/components';
import { Urls } from '@/config';
import { useRouter } from '@/navigation';

type Props = {
  secretVariablesCheck: SecretVariablesCheck;
};

export const Settings = ({ secretVariablesCheck }: Props) => {
  const userAuthRecord = useUserAuthContext();
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const [createdSetting, setCreatedSetting] = useState('old');
  const [userRecordIdSetting, setUserRecordIdSetting] = useState('old');

  const handleCreatedSetting = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCreatedSetting((target as HTMLInputElement).value);
  };

  const handleUserRecordIdSetting = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserRecordIdSetting((target as HTMLInputElement).value);
  };

  const handleJsonFileUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const data = await processFileUpload(event);
    const { gameList, recordName, status, created, userRecordId } = JSON.parse(data) as GameListRecord;

    if (!gameList?.length || !recordName?.length || !status) {
      enqueueSnackbar('Soubor nelze nahrát, pravděpodobně je ve špatném formátu', {
        variant: 'error',
      });

      return;
    }

    const createdResult = createdSetting === 'old' ? created : undefined;
    const userRecordIdResult = userRecordIdSetting === 'old' ? userRecordId : userAuthRecord?.recordId;

    startTransition(async () => {
      if (!userRecordIdResult) return;

      const { recordId } = await createGameListRecord(gameList, recordName, userRecordIdResult, status, createdResult);
      push(`${Urls.ADMIN}/${recordId}`);
    });
  };

  return (
    <Box my={4}>
      <AdministrationSettings />

      <Divider sx={{ mb: 3 }} />
      <Typography variant="h2" gutterBottom>
        Nahrát zálohu
      </Typography>

      <Typography gutterBottom>Celá záloha bude ihned nahrána jako nový seznam.</Typography>

      <Grid container>
        <Grid size={6}>
          <FormControl>
            <RadioGroup value={createdSetting} onChange={handleCreatedSetting}>
              <FormControlLabel value="old" control={<Radio />} label="Původní datum vytvoření" />
              <FormControlLabel value="new" control={<Radio />} label="Aktuální datum a čas" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl>
            <RadioGroup value={userRecordIdSetting} onChange={handleUserRecordIdSetting}>
              <FormControlLabel value="old" control={<Radio />} label="Původní uživatel" />
              <FormControlLabel value="new" control={<Radio />} label="Aktuální uživatel" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Stack direction="row" gap={2} my={4}>
        <ButtonAction startIcon={<Upload />} isPending={isPending}>
          <Box component="label">
            Nahrát JSON
            <VisuallyHiddenInput type="file" onChange={handleJsonFileUpload} />
          </Box>
        </ButtonAction>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <ProjectSettings secretVariablesCheck={secretVariablesCheck} />
    </Box>
  );
};
