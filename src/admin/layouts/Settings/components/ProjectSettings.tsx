'use client';

import { Check, Close } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { SecretVariablesCheck } from '@/admin/actions';

type Props = {
  secretVariablesCheck: SecretVariablesCheck;
};

export const ProjectSettings = ({ secretVariablesCheck }: Props) => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Nastavení projektu
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table>
          <TableBody>
            {Object.entries(secretVariablesCheck)?.map(([variable, result], index) => (
              <TableRow key={`${variable}_${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="td" scope="row">
                  {variable}
                </TableCell>
                <TableCell component="td" scope="row">
                  {result ? <Check /> : <Close />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
