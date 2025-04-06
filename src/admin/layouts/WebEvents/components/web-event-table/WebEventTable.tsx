'use client';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { WebEventRecord } from '@/admin/actions';

type Props = {
  title: string;
  webEventsRecords: WebEventRecord[];
};

export const WebEventTable = ({ title, webEventsRecords }: Props) => (
  <Box my={2}>
    <Typography variant="h3">{title}</Typography>

    <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Vytvořeno</TableCell>
            <TableCell>Umístění</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {webEventsRecords?.map(({ recordId, created, data, place }) => (
            <TableRow key={recordId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="td" scope="row">
                {created.toLocaleDateString()} {created.toLocaleTimeString()}
              </TableCell>
              <TableCell component="td" scope="row">
                {place}
              </TableCell>
              <TableCell component="td" scope="row">
                {Object.entries(data).map(([key, value]) => (
                  <Box key={key}>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {key}:
                    </Typography>{' '}
                    {value}
                  </Box>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);
