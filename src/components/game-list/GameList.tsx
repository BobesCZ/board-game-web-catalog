import { Game } from '@/types';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { GameCard } from '../game-card';

type Props = {
  gameList?: Game[];
  gameTotalCount?: number;
};

export const GameList = ({ gameList, gameTotalCount = 0 }: Props) => {
  const t = useTranslations();

  return (
    <Box py={4}>
      <Box mt={1} mb={4}>
        <Typography variant="h2" textAlign="center">
          {t('gameList.searchResults')}{' '}
          <Typography variant="h2" component="span" color="text.secondary">
            ({gameTotalCount})
          </Typography>
        </Typography>
      </Box>

      {gameList?.length ? (
        <Box
          sx={(theme) => ({
            display: 'grid',
            gap: 3,
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            [theme.breakpoints.up('md')]: {
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            },
            [theme.breakpoints.up('lg')]: {
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            },
          })}
        >
          {gameList.map((game) => (
            <GameCard key={game.uid} game={game} />
          ))}
        </Box>
      ) : (
        <Alert variant="outlined" severity="info">
          <AlertTitle>{t('gameList.noResults.title')}</AlertTitle>
          {t('gameList.noResults.content')}
        </Alert>
      )}
    </Box>
  );
};
