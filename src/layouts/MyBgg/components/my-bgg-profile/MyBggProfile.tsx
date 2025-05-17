'use client';

import { Delete, KeyboardArrowLeft, Person, Sync } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Link } from '@/components';
import { Urls } from '@/config';
import { CategoryFilters } from '@/layouts/Search/types';
import { hasStatus } from '@/layouts/Search/utils';
import { useAppStore } from '@/store';
import { MyBggCollection } from '@/types';
import { processCollectionGames } from '../../utils';
import { MyBggBenefits } from '../my-bgg-benefits';
import { CollectionItem } from './components';

export function MyBggProfile() {
  const t = useTranslations();
  const { gameList, myBggData, onMyBggDataChange, onMyBggDataClear } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

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
    const ratedCountBgg = myBggData?.bggCollectionGameList.filter(({ userRating }) => !!userRating).length ?? 0;

    const wanttoplayCountBgg =
      myBggData?.bggCollectionGameList.filter(({ userStatus }) => userStatus.wanttoplay).length ?? 0;
    const wanttobuyCountBgg =
      myBggData?.bggCollectionGameList.filter(({ userStatus }) => userStatus.wanttobuy).length ?? 0;
    const wishlistCountBgg =
      myBggData?.bggCollectionGameList.filter(({ userStatus }) => userStatus.wishlist).length ?? 0;

    return { ratedCountBgg, wanttoplayCountBgg, wanttobuyCountBgg, wishlistCountBgg };
  }, [myBggData]);

  const handleLoad = async () => {
    const username = myBggData?.username;

    if (!username?.length) return;

    setIsLoading(true);

    const bggCollectionGameList = await processCollectionGames(username);

    if (bggCollectionGameList) {
      onMyBggDataChange(username, bggCollectionGameList);
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Box mt={1} mb={3}>
          <Typography variant="h3" textAlign="center">
            {t('myBgg.myProfile')}
          </Typography>
        </Box>

        <Card sx={{ mb: 6 }}>
          <CardHeader
            avatar={
              <Avatar>
                <Person />
              </Avatar>
            }
            title={myBggData?.username}
            titleTypographyProps={{ variant: 'h4' }}
            subheader={t('myBgg.created', {
              created: new Date(myBggData?.created ?? 0).toLocaleDateString(),
            })}
            action={
              <Tooltip arrow title={t('myBgg.reload')}>
                <IconButton color="primary" disabled={isLoading} onClick={handleLoad} sx={{ my: 0.5 }}>
                  {isLoading ? <CircularProgress size={24} /> : <Sync />}
                </IconButton>
              </Tooltip>
            }
          />

          <Divider variant="middle" />

          <CardContent>
            <List disablePadding>
              <ListSubheader disableSticky disableGutters sx={{ textAlign: 'left' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>{t('myBgg.bggCount')}</Box>
                  <Box>{t('myBgg.catalogCount')}</Box>
                </Stack>
              </ListSubheader>
              <CollectionItem collectionKey="rated" count={ratedCount} countBgg={ratedCountBgg} isRated />
              <CollectionItem collectionKey="wanttoplay" count={wanttoplayCount} countBgg={wanttoplayCountBgg} />
              <CollectionItem collectionKey="wanttobuy" count={wanttobuyCount} countBgg={wanttobuyCountBgg} />
              <CollectionItem collectionKey="wishlist" count={wishlistCount} countBgg={wishlistCountBgg} />
            </List>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', py: 2 }}>
            <Button variant="outlined" color="error" size="small" startIcon={<Delete />} onClick={onMyBggDataClear}>
              {t('myBgg.clearButton')}
            </Button>
          </CardActions>
        </Card>

        <MyBggBenefits />

        <Stack direction="row" justifyContent="center" mb={8}>
          <Button component={Link} variant="contained" startIcon={<KeyboardArrowLeft />} href={Urls.SEARCH}>
            {t('myBgg.backButton')}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
