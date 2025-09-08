'use server';

import { neon } from '@neondatabase/serverless';
import { WEB_EVENTS_RECORDS_TABLE } from './config';
import { WebEventRecord } from './types';

const sql = neon(process.env.DATABASE_URL ?? '');

export const getWebEventRecords = async (): Promise<WebEventRecord[]> => {
  const query = `
    SELECT * 
    FROM ${WEB_EVENTS_RECORDS_TABLE}
    WHERE "created" >= NOW() - INTERVAL '14 days'
  `;

  return (await sql.query(query)) as WebEventRecord[];
};

export const createWebEventRecord = async (
  payload: Pick<WebEventRecord, 'type' | 'place'> & { data: Record<string, any> },
) => {
  const { columns, values } = Object.entries(payload).reduce(
    (res, [key, value]) => {
      if (value === undefined) return res;

      res.columns.push(`"${key}"`);
      res.values.push(key === 'data' ? `'${JSON.stringify(value).replace(/'/g, "''")}'` : `'${value}'`);

      return res;
    },
    { columns: [] as string[], values: [] as any[] },
  );

  const query = `
    INSERT INTO ${WEB_EVENTS_RECORDS_TABLE} (${columns.join(', ')})
    VALUES (${values.join(', ')})
  `;

  await sql.query(query);
};
