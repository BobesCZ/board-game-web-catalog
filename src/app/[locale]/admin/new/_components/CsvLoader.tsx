'use client';

import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { CsvColumnsOptions, CsvGame, getGameListFromCsv } from '@/csvParser';
import { ChangeEvent, ChangeEventHandler, useMemo, useState, useTransition } from 'react';
import { ButtonAction, VisuallyHiddenInput, processFileUpload } from '@/components';
import { createGameListRecord } from '@/actions';
import { Upload } from '@mui/icons-material';
import { Game } from '@/types';
import { parse } from 'papaparse';
import { CsvPreview } from './components/csv-preview';
import { useRouter } from 'next/navigation';
import { Urls } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { CsvHelp } from './components';
import { CSV_COLUMNS_OPTIONS } from '../../_components/config';

export const CsvLoader = () => {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();
  const [recordName, setRecordName] = useState('');
  const [gameList, setGameList] = useState<Game[]>([]);
  const [enableTypeGame, setEnableTypeGame] = useState(false);
  const modifiedCsvColumnsOptions: CsvColumnsOptions = useMemo(
    () => ({
      ...CSV_COLUMNS_OPTIONS,
      type: {
        ...CSV_COLUMNS_OPTIONS.type,
        enabled: enableTypeGame,
      },
    }),
    [enableTypeGame],
  );

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const data = await processFileUpload(event);
    const csvGameList = parse<CsvGame>(data, { header: true }).data;
    const newGameList = getGameListFromCsv(csvGameList, modifiedCsvColumnsOptions);

    if (!newGameList.length) {
      enqueueSnackbar('Soubor nelze nahrát, pravděpodobně je ve špatném formátu', {
        variant: 'error',
      });
    }

    setGameList(newGameList);
  };

  const handleCreateGameList = async () => {
    startTransition(async () => {
      const { recordId } = await createGameListRecord(gameList, recordName || 'Seznam her');
      push(`${Urls.ADMIN}/${recordId}`);
    });
  };

  return (
    <Box my={4}>
      <Typography variant="h2" gutterBottom>
        Vytvořit nový seznam
      </Typography>

      <CsvHelp
        enableTypeGame={enableTypeGame}
        setEnableTypeGame={setEnableTypeGame}
        modifiedCsvColumnsOptions={modifiedCsvColumnsOptions}
      />

      <Typography variant="h3">Nahrát CSV soubor</Typography>

      <Button component="label" variant="contained" startIcon={<Upload />} sx={{ mt: 3, mb: 5 }}>
        Nahrát
        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
      </Button>

      {!!gameList.length && (
        <>
          <Divider sx={{ mb: 3 }} />

          <CsvPreview gameList={gameList} />

          <Typography variant="h3" gutterBottom>
            Název seznamu
          </Typography>

          <Box width="50%">
            <TextField
              label="Název seznamu"
              value={recordName}
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setRecordName(event.target.value);
              }}
            />
          </Box>
          <Stack direction="row" gap={2} my={4}>
            <ButtonAction color="success" onClick={handleCreateGameList} isPending={isPending}>
              Uložit seznam do DB
            </ButtonAction>
          </Stack>
        </>
      )}
    </Box>
  );
};
