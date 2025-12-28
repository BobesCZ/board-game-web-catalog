'use client';

import { Cached, Check, Close, TableView } from '@mui/icons-material';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useTransition } from 'react';
import { createTables, revalidateAllAdminPaths, revalidateAllTags } from '@/admin/actions';
import { DB_SCHEMA, DISABLE_CREDENTIALS_ON_PRODUCTION } from '@/admin/config';
import { ButtonAction } from '@/components';

export const AdministrationSettings = () => {
  const [isPending, startTransition] = useTransition();

  const handleRevalidateAdmin = () => {
    startTransition(() => {
      revalidateAllAdminPaths();
      revalidateAllTags();
      enqueueSnackbar('Chache byla úspěšně vymazána', {
        variant: 'success',
      });
    });
  };

  const handleCreateTables = () => {
    startTransition(() => {
      createTables();
      enqueueSnackbar('DB tabulky byly aktualizovány', {
        variant: 'success',
      });
    });
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Nastavení Administrace
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="td" scope="row">
                DB_SCHEMA
              </TableCell>
              <TableCell component="td" scope="row">
                {DB_SCHEMA}
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="td" scope="row">
                DISABLE_CREDENTIALS_ON_PRODUCTION
              </TableCell>
              <TableCell component="td" scope="row">
                {DISABLE_CREDENTIALS_ON_PRODUCTION ? <Check /> : <Close />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" gap={2} my={4}>
        <ButtonAction color="error" startIcon={<Cached />} onClick={handleRevalidateAdmin} isPending={isPending}>
          Vymazat cache
        </ButtonAction>

        <ButtonAction color="warning" startIcon={<TableView />} onClick={handleCreateTables} isPending={isPending}>
          Aktualizovat DB tabulky
        </ButtonAction>
      </Stack>
    </>
  );
};
