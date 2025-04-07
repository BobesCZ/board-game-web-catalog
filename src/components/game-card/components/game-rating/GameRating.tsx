import { Box, Rating, Stack, Tooltip, TooltipProps, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
  title: TooltipProps['title'];
  rating: number;
  isMyBgg?: boolean;
};

export const GameRating = ({ title, rating, isMyBgg }: Props) => (
  <Box display="flex" mb={1.5}>
    <Tooltip arrow enterTouchDelay={100} title={title}>
      <Stack display="inline-flex" direction="row" alignItems="center" gap={1}>
        <Rating
          size="small"
          value={rating / 2}
          max={5}
          precision={0.1}
          readOnly
          sx={isMyBgg ? { '& .MuiRating-iconFilled': { color: '#3f3a60' } } : undefined}
        />
        <Typography variant="body2" component="span" sx={{ mt: 0.25, lineHeight: 1, color: grey[500] }}>
          {(rating * 10).toFixed(0)}%
        </Typography>
      </Stack>
    </Tooltip>
  </Box>
);
