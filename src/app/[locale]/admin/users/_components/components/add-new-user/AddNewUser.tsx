'use client';

import { Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState, useTransition } from 'react';
import { createUserAuthRecord } from '@/admin/actions';
import { ButtonAction } from '@/components';

type Props = {
  onClose?: () => void;
};

export const AddNewUser = ({ onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddNewUser = async () => {
    startTransition(async () => {
      await createUserAuthRecord({ name }, password);
      onClose?.();
    });
  };

  return (
    <>
      <Stack gap={2} mt={8} width="50%">
        <Typography variant="h3" gutterBottom>
          Nový uživatel
        </Typography>

        <TextField
          label="Jméno"
          value={name}
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />

        <TextField
          label="Heslo"
          value={password}
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
      </Stack>
      <Stack direction="row" gap={2} my={4}>
        <ButtonAction
          color="primary"
          onClick={handleAddNewUser}
          isPending={isPending}
          disabled={!name.length || !password.length}
        >
          Uložit uživatele do DB
        </ButtonAction>
      </Stack>
    </>
  );
};
