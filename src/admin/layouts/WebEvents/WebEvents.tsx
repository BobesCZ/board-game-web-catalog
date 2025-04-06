'use client';

import { Box, Typography } from '@mui/material';
import { groupBy } from 'lodash-es';
import { WebEventRecord } from '@/admin/actions';
import { WebEventTable } from './components';

type Props = {
  webEventsRecords: WebEventRecord[];
};

export const WebEvents = ({ webEventsRecords }: Props) => {
  const groupedEvents = groupBy(webEventsRecords, 'type');

  return (
    <Box my={4}>
      <Typography variant="h2" gutterBottom>
        Uživatelské události
      </Typography>

      {Object.entries(groupedEvents)?.map(([type, events]) => (
        <WebEventTable key={type} title={type} webEventsRecords={events} />
      ))}
    </Box>
  );
};
