'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  List,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useMyBggCollection } from '@/components/collection-loader/useMyBggCollection';
import { Delete, Person } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { CollectionItem } from './components';
import { useAppStore } from '@/store';
import { hasStatus } from '@/layouts/Search/utils';
import { MyBggCollection } from '@/types';
import { CategoryFilters } from '@/layouts/Search/types';

export function MyBggProfile() {
  const t = useTranslations();
  const { gameList } = useAppStore();
  const { myBggCollection, onMyBggCollectionClear } = useMyBggCollection();

  const { ratedCount, wanttoplayCount, wanttobuyCount, wishlistCount } = useMemo(() => {
    const ratedCount =
      (gameList || []).filter((game) => hasStatus(game, { bggStatus: MyBggCollection.RATED } as CategoryFilters))
        .length ?? 0;
    const wanttoplayCount =
      (gameList || []).filter((game) => hasStatus(game, { bggStatus: MyBggCollection.WANTTOPLAY } as CategoryFilters))
        .length ?? 0;
    const wanttobuyCount =
      (gameList || []).filter((game) => hasStatus(game, { bggStatus: MyBggCollection.WANTTOBUY } as CategoryFilters))
        .length ?? 0;
    const wishlistCount =
      (gameList || []).filter((game) => hasStatus(game, { bggStatus: MyBggCollection.WISHLIST } as CategoryFilters))
        .length ?? 0;

    return { ratedCount, wanttoplayCount, wanttobuyCount, wishlistCount };
  }, [gameList]);

  const { ratedCountBgg, wanttoplayCountBgg, wanttobuyCountBgg, wishlistCountBgg } = useMemo(() => {
    const ratedCountBgg = myBggCollection?.collectionGameList.filter(({ userRating }) => !!userRating).length ?? 0;

    const wanttoplayCountBgg =
      myBggCollection?.collectionGameList.filter(({ userStatus }) => userStatus.wanttoplay).length ?? 0;
    const wanttobuyCountBgg =
      myBggCollection?.collectionGameList.filter(({ userStatus }) => userStatus.wanttobuy).length ?? 0;
    const wishlistCountBgg =
      myBggCollection?.collectionGameList.filter(({ userStatus }) => userStatus.wishlist).length ?? 0;

    return { ratedCountBgg, wanttoplayCountBgg, wanttobuyCountBgg, wishlistCountBgg };
  }, [myBggCollection]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Box mt={1} mb={3}>
          <Typography variant="h3" textAlign="center">
            {t('myBgg.myProfile')}
          </Typography>
        </Box>

        <Card>
          <CardHeader
            avatar={
              <Avatar>
                <Person />
              </Avatar>
            }
            title={myBggCollection?.username}
            titleTypographyProps={{ variant: 'h4' }}
            subheader={t('myBgg.created', {
              created: new Date(myBggCollection?.created ?? 0).toLocaleDateString(),
            })}
          />
          <CardContent>
            <List disablePadding>
              <ListSubheader disableSticky disableGutters sx={{ textAlign: 'left' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>{t('myBgg.catalogCount')}</Box>
                  <Box>{t('myBgg.bggCount')}</Box>
                </Stack>
              </ListSubheader>
              <CollectionItem collectionKey="rated" count={ratedCount} countBgg={ratedCountBgg} isRated />
              <CollectionItem collectionKey="wanttoplay" count={wanttoplayCount} countBgg={wanttoplayCountBgg} />
              <CollectionItem collectionKey="wanttobuy" count={wanttobuyCount} countBgg={wanttobuyCountBgg} />
              <CollectionItem collectionKey="wishlist" count={wishlistCount} countBgg={wishlistCountBgg} />
            </List>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', py: 2 }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<Delete />}
              onClick={onMyBggCollectionClear}
            >
              {t('myBgg.clearButton')}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
