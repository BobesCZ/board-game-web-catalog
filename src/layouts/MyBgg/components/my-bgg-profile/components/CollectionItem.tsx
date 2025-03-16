'use client';

import { List, Star } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
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
      <ListItemIcon sx={{ minWidth: 40 }}>{isRated ? <Star /> : <List />}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              {t(`myBgg.collection.${collectionKey}`)}{' '}
              <Typography component="span" color="text.secondary">
                ({countBgg})
              </Typography>
            </Typography>
            <Typography textAlign="right">{count}</Typography>
          </Stack>
        }
      />
    </ListItem>
  );
}
