import { CSV_COLUMNS_OPTIONS } from '@/app/[locale]/admin/_components/config';
import { Game } from '@/types';
import { Alert, AlertTitle, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { getDuplicitGames } from './getDuplicitGames';

type Props = {
  gameList: Game[];
};

export const DuplicitGamesAlert = ({ gameList }: Props) => {
  const duplicitGames = useMemo(() => getDuplicitGames(gameList), [gameList]);

  return !!duplicitGames.length ? (
    <Stack direction="row" gap={2} alignItems="flex-start" my={4}>
      <Alert severity="error" sx={{ width: '50%', my: 4 }}>
        <AlertTitle>Seznam obsahuje duplicitní hry!</AlertTitle>
        <Typography variant="body2">Následující hry jsou v seznamu vícekrát:</Typography>
        <ul>
          {duplicitGames.map(({ uid, sourceName }) => (
            <li key={uid}>{sourceName}</li>
          ))}
        </ul>
      </Alert>
      <Alert severity="info" sx={{ width: '50%', my: 4 }}>
        <Typography variant="body2">Hry jsou duplicitní, pokud mají stejný obsah těchto sloupců:</Typography>
        <ul>
          <li>{CSV_COLUMNS_OPTIONS.name.colName}</li>
          <li>{CSV_COLUMNS_OPTIONS.langs.colName}</li>
          <li>Poznámky (rozšíření)</li>
        </ul>
      </Alert>
    </Stack>
  ) : null;
};
