'use server';

import { neon } from '@neondatabase/serverless';
import { MY_BGG_RECORDS_TABLE } from './config';
import { MyBggRecord } from './types';

const sql = neon(process.env.DATABASE_URL ?? '');

export const createMyBggRecord = async (username: string, gameListCount: number, created: number) => {
  const myBggRecord: MyBggRecord = {
    username,
    lastUpdated: new Date(created).toISOString(),
    gameListCount,
  };

  const { columns, values } = Object.entries(myBggRecord).reduce(
    (res, [key, value]) => {
      res.columns.push(`"${key}"`);
      res.values.push(value === null || value === undefined ? 'NULL' : `'${String(value).replace(/'/g, "''")}'`);

      return res;
    },
    { columns: [] as string[], values: [] as any[] },
  );

  const query = `
    INSERT INTO ${MY_BGG_RECORDS_TABLE} (${columns.join(', ')})
    VALUES (${values.join(', ')})
  `;

  await sql(query);
};

export const updateMyBggRecord = async (username: string, gameListCount: number) => {
  const query = `
    UPDATE ${MY_BGG_RECORDS_TABLE}
    SET 
      "gameListCount" = $1,
      "lastUpdated" = now()
    WHERE "username" = $2
    RETURNING "recordId";
  `;

  await sql(query, [gameListCount, username]);
};
