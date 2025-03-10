'use client';

import { Delete } from '@mui/icons-material';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useTransition } from 'react';
import { deleteGameListRecords } from '@/admin/actions';
import { ButtonAction } from '@/components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

type Props = {
  isModalOpened: boolean;
  handleCloseModal: () => void;
};

export const ConfirmDeleteModal = ({ isModalOpened, handleCloseModal }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteRecords = async () => {
    startTransition(async () => {
      await deleteGameListRecords();
      handleCloseModal();
    });
  };

  return (
    <Modal open={isModalOpened} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Upozornění
        </Typography>

        <Typography sx={{ mt: 2, mb: 3 }}>Opravdu chcete smazat všechny položky?</Typography>

        <Stack direction="row" gap={4}>
          <ButtonAction color="error" onClick={handleDeleteRecords} isPending={isPending} startIcon={<Delete />}>
            Ano, smazat
          </ButtonAction>

          <Button variant="text" onClick={handleCloseModal}>
            Zpět
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
