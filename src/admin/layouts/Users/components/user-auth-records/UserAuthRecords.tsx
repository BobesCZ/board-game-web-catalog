'use client';

import { Add, Delete, Done, Lock, QueryBuilder } from '@mui/icons-material';
import {
  Alert,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
} from '@mui/material';
import { useState, useTransition } from 'react';
import { authorizeUserAuthRecord, deleteUserAuthRecord } from '@/admin/actions';
import { UserAuthRecord, UserAuthStatus, useUserAuth } from '@/admin/components';
import { IS_DEVELOPMENT } from '@/admin/config';
import { ButtonAction } from '@/components';
import { AddNewUser } from '../add-new-user';

type Props = {
  userAuthRecords: UserAuthRecord[];
};

export const UserAuthRecords = ({ userAuthRecords }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [showAddNewUser, setShowAddNewUser] = useState(false);

  const { userAuthRecord } = useUserAuth(userAuthRecords);

  const handleShowAddNewUser = () => {
    setShowAddNewUser((prev) => !prev);
  };

  const handleAuthorize = async (recordId: number) => {
    startTransition(() => authorizeUserAuthRecord(recordId));
  };

  const handleDelete = async (recordId: number) => {
    startTransition(() => deleteUserAuthRecord(recordId));
  };

  const getStatusIcon = (status: `${UserAuthStatus}`) =>
    status === UserAuthStatus.Authorized ? <Done fontSize="small" /> : <QueryBuilder fontSize="small" />;

  const getStatusText = (status: `${UserAuthStatus}`) =>
    status === UserAuthStatus.Waiting ? 'Čeká na udělení přístupu' : 'Přístup udělen';

  const getPassword = (password: string) => (IS_DEVELOPMENT ? password : <Lock fontSize="inherit" />);

  return (
    <>
      <Typography variant="h2" gutterBottom mt={4}>
        Seznam uživatelů
      </Typography>

      {!IS_DEVELOPMENT && (
        <Alert severity="warning">Na tomto prostředí nelze editovat uživatele. Kontaktujte svého správce.</Alert>
      )}

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Jméno</TableCell>
              <TableCell>Heslo</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Stav</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAuthRecords?.map((record, index) => (
              <TableRow
                key={`${record.recordId}_${index}`}
                sx={(theme) => ({
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor:
                    userAuthRecord?.recordId === record.recordId ? alpha(theme.palette.primary.main, 0.25) : undefined,
                })}
              >
                <TableCell component="td" scope="row">
                  {record.name}
                </TableCell>
                <TableCell component="td" scope="row">
                  {record.password && getPassword(record.password)}
                </TableCell>
                <TableCell component="td" scope="row">
                  {record.email}
                </TableCell>
                <TableCell component="td" scope="row">
                  <Stack direction="row" alignItems="center" gap={1}>
                    {getStatusIcon(record.status)} {getStatusText(record.status)}
                  </Stack>
                </TableCell>

                <TableCell component="td" scope="row">
                  <Stack direction={'row'} gap={1}>
                    <ButtonAction
                      color="primary"
                      onClick={() => handleAuthorize(record.recordId)}
                      isPending={isPending}
                      startIcon={<Done />}
                      disabled={!IS_DEVELOPMENT || record?.status === UserAuthStatus.Authorized}
                    >
                      Udělit přistup
                    </ButtonAction>
                    <ButtonAction
                      color="error"
                      onClick={() => handleDelete(record.recordId)}
                      isPending={isPending}
                      startIcon={<Delete />}
                      disabled={!IS_DEVELOPMENT || userAuthRecord?.recordId === record.recordId}
                    >
                      Smazat
                    </ButtonAction>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {IS_DEVELOPMENT && (
        <Stack direction="row" gap={2} alignItems="center" my={4}>
          <Button variant="contained" color="success" onClick={handleShowAddNewUser} startIcon={<Add />}>
            Přidat nového uživatele
          </Button>
        </Stack>
      )}

      {showAddNewUser && <AddNewUser onClose={() => setShowAddNewUser(false)} />}
    </>
  );
};
