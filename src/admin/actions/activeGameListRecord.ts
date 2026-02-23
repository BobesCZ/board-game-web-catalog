'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath, unstable_cache, updateTag } from 'next/cache';
import { Urls } from '@/config';
import { GAMELIST_RECORDS_TABLE } from './config';
import { CacheTags, GameListRecord } from './types';

const sql = neon(process.env.DATABASE_URL ?? '');

const getActiveGameListRecordPromise = async () => {
  const query = `
    SELECT * FROM ${GAMELIST_RECORDS_TABLE}
    WHERE "isActive" = true
    LIMIT 1;
  `;

  const result = (await sql.query(query)) as GameListRecord[];

  return result?.[0];
};

export const getActiveGameListRecord = unstable_cache(getActiveGameListRecordPromise, ['getActiveGameListRecord'], {
  tags: [CacheTags.ACTIVE_GAMELIST],
});

export const setActiveGameListRecord = async (recordId: number) => {
  // Deactivate all records
  const deactivateQuery = `
    UPDATE ${GAMELIST_RECORDS_TABLE}
    SET "isActive" = false;
  `;

  await sql.query(deactivateQuery);

  // Activate specific record
  const activateQuery = `
   UPDATE ${GAMELIST_RECORDS_TABLE}
   SET "isActive" = true
   WHERE "recordId" = ${recordId}
   RETURNING "recordId";
 `;

  await sql.query(activateQuery);

  updateTag(CacheTags.ACTIVE_GAMELIST);
  revalidatePath(Urls.ADMIN);
};
