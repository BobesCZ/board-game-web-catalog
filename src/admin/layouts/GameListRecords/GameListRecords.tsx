'use client';

import { Add, Delete, Done, QueryBuilder, Settings, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
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
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { GameListRecordItem, GameListRecordStatus } from '@/admin/actions';
import { IS_DEVELOPMENT } from '@/admin/config';
import { Link } from '@/components';
import { Urls } from '@/config';
import { ConfirmDeleteModal } from './components';

type Props = {
  gameListRecords: GameListRecordItem[];
};

export const GameListRecords = ({ gameListRecords }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = () => setIsModalOpened(false);

  const getCellSx = (isActive: boolean) => ({ fontWeight: isActive ? 'bold' : undefined });

  const getStatusIcon = (status: `${GameListRecordStatus}`) =>
    status === GameListRecordStatus.COMPLETED ? <Done fontSize="small" /> : <QueryBuilder fontSize="small" />;

  const getStatusText = (status: `${GameListRecordStatus}`) =>
    status === GameListRecordStatus.COMPLETED ? 'Staženo' : `Čeká na stažení`;

  return (
    <>
      <Typography variant="h2" gutterBottom mt={4}>
        Seznamy her
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader component="div">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">Aktivní</TableCell>
              <TableCell component="div">Vytvořeno</TableCell>
              <TableCell component="div">Název</TableCell>
              <TableCell component="div">Stav loaderu</TableCell>
              <TableCell component="div">Počet her</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {gameListRecords?.map(
              ({ recordId, status, recordName, gameListCount, created, isActive, createdBy }, index) => (
                <TableRow
                  key={`${recordId}_${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  hover
                  component={Link}
                  href={`${Urls.ADMIN}/${recordId}`}
                >
                  <TableCell component="div" scope="row" sx={getCellSx(isActive)}>
                    {isActive ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" color="disabled" />}
                  </TableCell>
                  <TableCell component="div" scope="row" sx={getCellSx(isActive)}>
                    {new Date(created).toLocaleString()}{' '}
                    <Box component="span" sx={{ color: 'text.secondary' }}>
                      ({createdBy})
                    </Box>
                  </TableCell>
                  <TableCell component="div" scope="row" sx={getCellSx(isActive)}>
                    {recordName}
                  </TableCell>
                  <TableCell component="div" scope="row" sx={getCellSx(isActive)}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      {getStatusIcon(status)} {getStatusText(status)}
                    </Stack>
                  </TableCell>
                  <TableCell component="div" scope="row" sx={getCellSx(isActive)}>
                    {gameListCount}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <Button variant="contained" color="success" startIcon={<Add />} LinkComponent={Link} href={Urls.ADMIN_NEW}>
          Vytvořit nový seznam
        </Button>
        <Button variant="contained" color="error" onClick={handleOpenModal} startIcon={<Delete />}>
          Smazat všechny seznamy
        </Button>
      </Stack>

      <ConfirmDeleteModal isModalOpened={isModalOpened} handleCloseModal={handleCloseModal} />
    </>
  );
};
