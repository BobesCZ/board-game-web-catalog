'use client';

import { ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { List, Star } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

type Props = {
  collectionKey: string;
  count: number;
  countBgg: number;
  isRated?: boolean;
};

export function CollectionItem({ collectionKey, count, countBgg, isRated = false }: Props) {
  const t = useTranslations();

  return (
    <ListItem disablePadding>
      <ListItemIcon>{isRated ? <Star /> : <List />}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Stack direction="row" justifyContent="space-between">
            <Typography>{t(`myBgg.collection.${collectionKey}`)}</Typography>
            <Stack direction="row" gap={1}>
              <Typography>{count}</Typography>
              <Typography width={48} textAlign="right">
                ({countBgg})
              </Typography>
            </Stack>
          </Stack>
        }
      />
    </ListItem>
  );
}
