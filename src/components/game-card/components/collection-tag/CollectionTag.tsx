import { List } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MyBggCollection } from '@/types';

type Props = {
  name: `${MyBggCollection}`;
};

export const CollectionTag = ({ name }: Props) => {
  const t = useTranslations();
  const collectionName = t(`myBgg.collection.${name}`);

  return (
    <Chip
      color="primary"
      icon={<List fontSize="small" />}
      label={collectionName}
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: '#3f3a60',
        '.MuiChip-icon': {
          fontSize: 18,
        },
      })}
    />
  );
};
