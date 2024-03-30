'use client';

import { createGameListRecord } from '@/actions';
import { GameListRecord } from '@/actions/types';
import { revalidateAllAdminPaths, revalidateAllTags } from '@/actions/utils';
import { ButtonAction, VisuallyHiddenInput, processFileUpload } from '@/components';
import { Urls } from '@/config';
import { Cached, Upload } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { ChangeEventHandler, useTransition } from 'react';

export const Settings = () => {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const handleRevalidateAdmin = () => {
    startTransition(() => {
      revalidateAllAdminPaths();
      revalidateAllTags();
      enqueueSnackbar('Chache byla úspěšně vymazána', {
        variant: 'success',
      });
    });
  };

  const handleJsonFileUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const data = await processFileUpload(event);
    const { gameList, recordName, status } = JSON.parse(data) as GameListRecord;

    if (!gameList?.length || !recordName?.length || !status) {
      enqueueSnackbar('Soubor nelze nahrát, pravděpodobně je ve špatném formátu', {
        variant: 'error',
      });

      return;
    }

    startTransition(async () => {
      const { recordId } = await createGameListRecord(gameList, recordName, status);
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
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h2" gutterBottom>
        Nahrát zálohu
      </Typography>

      <Typography gutterBottom>
        Celá záloha bude ihned nahrána jako nový seznam (použije se aktuální datum a čas).
      </Typography>

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
