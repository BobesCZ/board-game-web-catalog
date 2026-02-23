import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
} from '@mui/material';
import { pickBy } from 'lodash-es';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { CSV_COLUMNS_OPTIONS } from '@/admin/config';
import { CsvColumnOption, CsvColumnsOptions } from '@/admin/csvParser';
import { CSV_COLUMNS_HELPS } from './config';
import { CsvColumnsHelpDemand } from './types';

type Props = {
  enableTypeGame: boolean;
  setEnableTypeGame: Dispatch<SetStateAction<boolean>>;
  modifiedCsvColumnsOptions: CsvColumnsOptions;
};

export const CsvHelp = ({ enableTypeGame, setEnableTypeGame, modifiedCsvColumnsOptions }: Props) => {
  const columns = pickBy(
    CSV_COLUMNS_HELPS,
    (_, column) =>
      (modifiedCsvColumnsOptions[column as keyof CsvColumnsOptions] as CsvColumnOption<true>)?.enabled !== false,
  );

  const getRowBackground = (column: keyof CsvColumnsOptions) => {
    switch (column) {
      case 'type':
      case 'name':
      case 'langs':
      case 'location':
      case 'added':
        return '#cfe7f5';

      case 'id':
        return '#e6e6ff';

      case 'yearpublished':
      case 'image':
      case 'playingtime':
      case 'minplayers':
      case 'maxplayers':
        return '#ccffcc';
    }
  };

  const getDemandText = (demand: `${CsvColumnsHelpDemand}`) => {
    switch (demand) {
      case CsvColumnsHelpDemand.Required:
        return 'Povinné';
      case CsvColumnsHelpDemand.Unrequired:
        return 'Nepovinné';
      case CsvColumnsHelpDemand.Rewriting:
        return 'Vlastní*';
    }
  };

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => setEnableTypeGame(event.target.checked);

  return (
    <Box mt={2}>
      <Typography variant="h3">Nastavení CSV sloupců</Typography>

      <FormControlLabel
        control={<Switch checked={enableTypeGame} onChange={handleSwitch} />}
        label="Použít rozdělení na Hry a Poznámky"
        sx={{ my: 2 }}
      />

      <TableContainer component={Paper} elevation={4} sx={{ my: 2, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Název sloupce</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Povinné</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Povolené hodnoty</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Popis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(columns).map(([column, { demand, values, description }]) => (
              <TableRow
                key={column}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: alpha(getRowBackground(column as keyof CsvColumnsOptions), 0.6),
                }}
              >
                <TableCell component="td" scope="row">
                  {CSV_COLUMNS_OPTIONS[column as keyof CsvColumnsOptions].colName}
                </TableCell>
                <TableCell>{getDemandText(demand)}</TableCell>
                <TableCell component="td" scope="row">
                  <code>{values.join(', ')}</code>
                </TableCell>
                <TableCell component="td" scope="row">
                  {description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography my={4}>
        * Tyto sloupce vyplňte pouze v případě, že hru nelze dohledat v BGG. Hra, která má vyplněný aspoň 1 z těchto
        sloupců, bude označena jako <i>úspěšně načtená</i> a nebude se již dohledávat na BGG.
      </Typography>
    </Box>
  );
};
