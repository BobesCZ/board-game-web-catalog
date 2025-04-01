'use client';

import { Cached, TableView, Upload } from '@mui/icons-material';
import { Box, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, ChangeEventHandler, useState, useTransition } from 'react';
import {
  GameListRecord,
  createGameListRecord,
  createTables,
  revalidateAllAdminPaths,
  revalidateAllTags,
} from '@/admin/actions';
import { ButtonAction, VisuallyHiddenInput, processFileUpload } from '@/components';
import { Urls } from '@/config';
import { useRouter } from '@/navigation';

export const Settings = () => {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const [createdSetting, setCreatedSetting] = useState('old');

  const handleCreatedSetting = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCreatedSetting((target as HTMLInputElement).value);
  };

  const handleRevalidateAdmin = () => {
    startTransition(() => {
      revalidateAllAdminPaths();
      revalidateAllTags();
      enqueueSnackbar('Chache byla úspěšně vymazána', {
        variant: 'success',
      });
    });
  };

  const handleCreateTables = () => {
    startTransition(() => {
      createTables();
      enqueueSnackbar('DB tabulky byly aktualizovány', {
        variant: 'success',
      });
    });
  };

  const handleJsonFileUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const data = await processFileUpload(event);
    const { gameList, recordName, status, created } = JSON.parse(data) as GameListRecord;

    if (!gameList?.length || !recordName?.length || !status) {
      enqueueSnackbar('Soubor nelze nahrát, pravděpodobně je ve špatném formátu', {
        variant: 'error',
      });

      return;
    }

    const createdResult = createdSetting === 'old' ? created : undefined;

    startTransition(async () => {
      const { recordId } = await createGameListRecord(gameList, recordName, status, createdResult);
      push(`${Urls.ADMIN}/${recordId}`);
    });
  };

  return (
    <Box my={4}>
      <Typography variant="h2" gutterBottom>
        Nastavení Administrace
      </Typography>

      <Stack direction="row" gap={2} my={4}>
        <ButtonAction color="error" startIcon={<Cached />} onClick={handleRevalidateAdmin} isPending={isPending}>
          Vymazat cache
        </ButtonAction>

        <ButtonAction color="warning" startIcon={<TableView />} onClick={handleCreateTables} isPending={isPending}>
          Aktualizovat DB tabulky
        </ButtonAction>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h2" gutterBottom>
        Nahrát zálohu
      </Typography>

      <Typography gutterBottom>Celá záloha bude ihned nahrána jako nový seznam.</Typography>

      <FormControl>
        <RadioGroup value={createdSetting} onChange={handleCreatedSetting}>
          <FormControlLabel value="old" control={<Radio />} label="Původní datum vytvoření" />
          <FormControlLabel value="new" control={<Radio />} label="Aktuální datum a čas" />
        </RadioGroup>
      </FormControl>

      <Stack direction="row" gap={2} my={4}>
        <ButtonAction startIcon={<Upload />} isPending={isPending}>
          <Box component="label">
            Nahrát JSON
            <VisuallyHiddenInput type="file" onChange={handleJsonFileUpload} />
          </Box>
        </ButtonAction>
      </Stack>
    </Box>
  );
};
