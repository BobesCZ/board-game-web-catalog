import { Alarm, Group } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Collapse, Stack, Typography, lighten } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { MAX_RANK_LIMIT } from '@/config';
import { Game, LocaleLang, Status } from '@/types';
import {
  BggLink,
  CardActions,
  CardImage,
  CollectionTag,
  GameInfoItem,
  GameRating,
  GameWeight,
  LangItem,
  LocationTag,
  NoteTag,
  PlayersCountString,
  RankTag,
  ZhLink,
} from './components';

type Props = {
  game: Game;
};

export const GameCard = ({
  game: {
    uid,
    sourceName,
    id,
    primaryName,
    image,
    yearpublished,
    playingtime,
    minplayers,
    maxplayers,
    minage,
    categories,
    mechanics,
    averageRating,
    averageWeight,
    ranks,
    notes,
    status,
    langs,
    location,
    myBggStatus,
  },
}: Props) => {
  const t = useTranslations();
  const resolvedLanguage = useLocale();

  const [expanded, setExpanded] = useState(false);
  const filteredRanks = (ranks || [])?.filter(({ value }) => value <= MAX_RANK_LIMIT);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
        backgroundImage: !!myBggStatus?.userRating
          ? `linear-gradient(${lighten('#3f3a60', 0.91)}, ${lighten('#3f3a60', 0.93)})`
          : undefined,
        border: !!myBggStatus?.userRating ? `1px solid ${lighten('#3f3a60', 0.5)}` : undefined,
      }}
      elevation={3}
      data-uid={uid}
      data-id={id}
    >
      <CardContent>
        <Box position="relative">
          <CardImage image={image} />

          {(!!location || !!filteredRanks.length || !!myBggStatus?.collections.length) && (
            <Stack
              alignItems="flex-start"
              gap={1}
              sx={(theme) => ({ position: 'absolute', top: theme.spacing(-1.5), left: theme.spacing(-1.5) })}
            >
              {location && <LocationTag location={location} />}
              {filteredRanks.map((rank) => (
                <RankTag key={rank.name} rank={rank} />
              ))}
              {myBggStatus?.collections?.map((name) => <CollectionTag key={name} name={name} />)}
            </Stack>
          )}
          {!!averageWeight?.value && <GameWeight averageWeight={averageWeight} />}

          {!!langs?.length && (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={(theme) => ({ position: 'absolute', bottom: theme.spacing(-3), right: theme.spacing(-1.5) })}
            >
              {langs?.map((lang) => <LangItem key={lang} lang={lang} />)}
            </Stack>
          )}
        </Box>

        <Typography variant="h3" sx={{ mb: 0.25 }}>
          {resolvedLanguage === LocaleLang.CS ? sourceName : primaryName}{' '}
          {yearpublished && (
            <Typography variant="h3" component="span" color="text.secondary">
              ({yearpublished})
            </Typography>
          )}
        </Typography>

        {!!myBggStatus?.userRating && (
          <GameRating rating={myBggStatus.userRating} title={t('gameCard.yourBggRating')} isMyBgg />
        )}
        {!!averageRating?.value && !myBggStatus?.userRating && (
          <GameRating
            rating={averageRating.value}
            title={t('gameCard.usersCount', {
              usersCount: averageRating.usersCount.toLocaleString(resolvedLanguage),
            })}
          />
        )}

        <Stack gap={1.5} direction="row">
          <GameInfoItem Icon={Group}>
            {!!minplayers && <PlayersCountString minplayers={minplayers} maxplayers={maxplayers} />}
          </GameInfoItem>
          <GameInfoItem Icon={Alarm}>{!!playingtime && <>{t('gameCard.playingtime', { playingtime })}</>}</GameInfoItem>
        </Stack>

        {!!categories?.length && (
          <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
            {categories.map((item) => (
              <Chip key={item} label={t(`bgg.categories.${item}`)} />
            ))}
          </Stack>
        )}

        {!!notes?.length && (
          <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
            {notes.map((item) => (
              <NoteTag key={item} note={item} />
            ))}
          </Stack>
        )}

        {status !== Status.FINISHED && (
          <Typography variant="body2" sx={{ mt: 1, color: grey[500] }}>
            {t('gameCard.noInfo')}
          </Typography>
        )}

        {status === Status.FINISHED && (
          <Collapse in={expanded}>
            <Stack mt={3} alignItems="flex-start" gap={0.5} mb={1}>
              <BggLink id={id} />
              <ZhLink sourceName={sourceName} />

              {!!minage && (
                <Typography variant="body1" color="text.secondary">
                  {t('gameCard.minage', { minage })}
                </Typography>
              )}
            </Stack>

            {!!mechanics?.length && (
              <>
                <Typography variant="h4" mt={1.5} mb={1}>
                  {t('search.form.mechanics.label')}
                </Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {mechanics?.map((item) => <Chip variant="outlined" key={item} label={t(`bgg.mechanics.${item}`)} />)}
                </Stack>
              </>
            )}
          </Collapse>
        )}
      </CardContent>

      {status === Status.FINISHED && (
        <CardActions
          expanded={expanded}
          handleToggleExpanded={() => setExpanded((prev) => !prev)}
          location={location}
        />
      )}
    </Card>
  );
};
