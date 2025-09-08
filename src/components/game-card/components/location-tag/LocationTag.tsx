import { LocationOnOutlined } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Game } from '@/types';

type Props = { location: NonNullable<Game['location']> };

export const LocationTag = ({ location }: Props) => {
  const t = useTranslations();

  return (
    <Tooltip arrow enterTouchDelay={100} title={t(`gameCard.locationTag`, { location })}>
      <Chip
        variant="outlined"
        icon={<LocationOnOutlined fontSize="small" />}
        label={location}
        sx={(theme) => ({
          boxShadow: theme.shadows[4],
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          backgroundColor: theme.palette.background.paper,
          '.MuiChip-icon': { fontSize: 18 },
        })}
      />
    </Tooltip>
  );
};
