import { Bookmark } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import { floor } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { Rating } from '@/types';
import { getColorByWeightLevel, getWeightLevel } from './utils';

type Props = {
  averageWeight: Rating;
};

export const GameWeight = ({ averageWeight }: Props) => {
  const t = useTranslations();
  const value = floor(averageWeight.value, 1);
  const weightLevel = getWeightLevel(value);

  return (
    <Tooltip arrow enterTouchDelay={100} title={t(`gameCard.weight.${weightLevel}`)}>
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: theme.spacing(-2.75),
          right: theme.spacing(-3.25),
          display: 'flex',
        })}
      >
        <Bookmark
          sx={(theme) => ({
            fontSize: 64,
            color: getColorByWeightLevel(weightLevel, theme),
            filter: `drop-shadow(0px 4px 2px rgba(0,0,0,0.2))`,
          })}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" component="div" color="white">
            {value.toFixed(1)}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};
