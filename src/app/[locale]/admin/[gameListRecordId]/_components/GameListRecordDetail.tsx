'use client';

import { Alert, AlertTitle, Box, Button, Divider, Stack, ThemeProvider, Typography } from '@mui/material';
import { useMemo, useState, useTransition } from 'react';
import { deleteGameListRecord, setActiveGameListRecord } from '@/actions';
import { ChevronLeft, Delete, Download, ExpandMore, Settings, Visibility, VisibilityOff } from '@mui/icons-material';
import { ButtonAction, GameList, Link } from '@/components';
import { GameListRecord, GameListRecordStatus } from '@/actions/types';
import { Status } from '@/types';
import { BggLoader } from './components';
import { useRouter } from 'next/navigation';
import { Urls } from '@/config';
import { theme } from '@/theme/theme';
import { IS_DEVELOPMENT } from '../../_components/config';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

type Props = {
  activeGameListRecord?: number;
  gameListRecord: GameListRecord;
};

export const GameListRecordDetail = ({ activeGameListRecord, gameListRecord }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const [showGameList, setShowGameList] = useState(false);
  const [showBggLoader, setShowBggLoader] = useState(true);
  const [showDbScan, setShowDbScan] = useState(false);

  const gameList = gameListRecord.gameList;

  const { newCount, unfinishedCount } = useMemo(
    () => ({
      newCount: gameList?.filter((game) => game.status === Status.NEW).length,
      unfinishedCount: gameList?.filter((game) => game.status === Status.UNFINISHED).length,
      finishedCount: gameList?.filter((game) => game.status === Status.FINISHED).length,
    }),
    [gameList],
  );

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteGameListRecord(gameListRecord.recordId);
      push(Urls.ADMIN);
    });
  };

  const handleActivate = async () => {
    startTransition(() => setActiveGameListRecord(gameListRecord.recordId));
  };

  const handleDownload = () => {
    const content = JSON.stringify(gameListRecord, undefined, 2);

    const link = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    const created = new Date(gameListRecord.recordId ?? 0).toISOString().split('T')[0];
    link.download = `record ${created} ${gameListRecord.recordName}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleShowGameList = () => setShowGameList((prev) => !prev);
  const handleShowBggLoader = () => setShowBggLoader((prev) => !prev);
  const handleShowDbScan = () => setShowDbScan((prev) => !prev);

  return (
    <>
      <Link href={Urls.ADMIN} display="inline-flex">
        <Stack direction="row" alignItems="center" mt={3}>
          <ChevronLeft fontSize="small" /> zpět na Seznamy her
        </Stack>
      </Link>
      <Typography variant="h2" gutterBottom mt={2}>
        {gameListRecord.recordName || ''}{' '}
        <Box component="span" fontWeight="normal">
          ({new Date(gameListRecord.recordId).toLocaleString()})
        </Box>
      </Typography>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <ButtonAction
          color="success"
          onClick={handleActivate}
          isPending={isPending}
          disabled={
            gameListRecord.status !== GameListRecordStatus.COMPLETED || activeGameListRecord === gameListRecord.recordId
          }
          startIcon={<Visibility />}
        >
          Označit jako aktivní
        </ButtonAction>

        <Button variant="contained" color="primary" onClick={handleDownload} startIcon={<Download />}>
          Stáhnout zálohu (JSON)
        </Button>

        <ButtonAction
          color="error"
          onClick={handleDelete}
          isPending={isPending}
          startIcon={<Delete />}
          disabled={activeGameListRecord === gameListRecord.recordId}
        >
          Smazat seznam
        </ButtonAction>
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        {gameListRecord.status === GameListRecordStatus.COMPLETED ? (
          <Alert severity="success" sx={{ width: '50%' }}>
            <AlertTitle>Všechny hry staženy ({gameList.length})</AlertTitle>
            Nenalezeno {unfinishedCount} her.
          </Alert>
        ) : (
          <Alert severity="warning" sx={{ width: '50%' }}>
            <AlertTitle>Chybí stáhnout {newCount} her</AlertTitle>
            Nenalezeno {unfinishedCount} her.
          </Alert>
        )}

        {activeGameListRecord === gameListRecord.recordId ? (
          <Alert severity="info" icon={<Visibility />} sx={{ width: '50%' }}>
            <AlertTitle>Zveřejněno</AlertTitle>
            Seznam je aktuálně viditelný pro uživatele.
          </Alert>
        ) : (
          <Alert severity="info" icon={<VisibilityOff />} sx={{ width: '50%' }}>
            <AlertTitle>Nezveřejněno</AlertTitle>
            Seznam je aktuálně skrytý.
          </Alert>
        )}
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleShowBggLoader}
          startIcon={<ExpandMore />}
          sx={(theme) => ({
            '.MuiButton-startIcon': {
              transition: theme.transitions.create('transform'),
              transform: `rotate(${showBggLoader ? -180 : 0}deg)`,
            },
          })}
        >
          {showBggLoader ? 'Skrýt' : 'Zobrazit'} BGG loader
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleShowGameList}
          startIcon={<ExpandMore />}
          sx={{
            '.MuiButton-startIcon': {
              transition: theme.transitions.create('transform'),
              transform: `rotate(${showGameList ? -180 : 0}deg)`,
            },
          }}
        >
          {showGameList ? 'Skrýt' : 'Zobrazit'} náhled seznamu her
        </Button>
        {IS_DEVELOPMENT && (
          <Button variant="outlined" color="primary" onClick={handleShowDbScan} startIcon={<Settings />}>
            Zobrazit DbScan
          </Button>
        )}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {showBggLoader && <BggLoader gameListRecord={gameListRecord} />}

      <ThemeProvider theme={theme}>
        {showGameList && <GameList gameList={gameList} gameTotalCount={gameList.length} />}
      </ThemeProvider>

      {showDbScan && <ReactJson src={gameListRecord} theme="pop" />}
    </>
  );
};
