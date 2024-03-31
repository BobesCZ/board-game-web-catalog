import { CircularProgress, Stack } from '@mui/material';

export const AppLoader = () => (
  <Stack flexGrow={1} direction="row" justifyContent="center" alignItems="center">
    <CircularProgress />
  </Stack>
);
