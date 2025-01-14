import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';

type Props = {
  id: SnackbarKey;
};

export const SnackbarCloseButton = ({ id }: Props) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(id)} color="inherit">
      <Close />
    </IconButton>
  );
};
