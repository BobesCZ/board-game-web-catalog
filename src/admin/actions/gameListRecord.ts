'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { Urls } from '@/config';
import { Game, Status } from '@/types';
import { GAMELIST_RECORDS_TABLE } from './config';
import { CacheTags, GameListRecord, GameListRecordItem, GameListRecordStatus } from './types';

const sql = neon(process.env.DATABASE_URL ?? '');

const getGameListRecordsPromise = async (): Promise<GameListRecordItem[]> => {
  const query = `
    SELECT 
      "recordId",
      "created",
      "recordName",
      "status",
      jsonb_array_length("gameList") AS "gameListCount",
      "isActive"
    FROM ${GAMELIST_RECORDS_TABLE}
    ORDER BY "recordId" ASC;
  `;

  return (await sql.query(query)) as GameListRecordItem[];
};

export const getGameListRecords = unstable_cache(getGameListRecordsPromise, ['getGameListRecords'], {
  tags: [CacheTags.GAMELIST_RECORDS],
});

export const getGameListRecord = async (recordId: number): Promise<GameListRecord> => {
  const query = `
    SELECT * FROM ${GAMELIST_RECORDS_TABLE}
    WHERE "recordId" = $1
  `;

  const result = (await sql.query(query, [recordId])) as GameListRecord[];

  return result?.[0];
};

export const createGameListRecord = async (
  gameList: Game[],
  recordName: string,
  status?: `${GameListRecordStatus}`,
  created?: Date,
): Promise<{ recordId: number }> => {
  const gameListRecord: Partial<GameListRecord> = {
    recordName,
    status: status ?? GameListRecordStatus.INCOMPLETED,
    gameList,
    created,
  };

  const { columns, values } = Object.entries(gameListRecord).reduce(
    (res, [key, value]) => {
      if (value === undefined) return res;

      res.columns.push(`"${key}"`);
      res.values.push(Array.isArray(value) ? `'${JSON.stringify(value).replace(/'/g, "''")}'` : `'${value}'`);

      return res;
    },
    { columns: [] as string[], values: [] as any[] },
  );

  const query = `
    INSERT INTO ${GAMELIST_RECORDS_TABLE} (${columns.join(', ')})
    VALUES (${values.join(', ')})
    RETURNING "recordId";
  `;

  const result = await sql.query(query);

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);

  return { recordId: result[0].recordId };
};

export const updateGameListRecord = async (recordId: number, gameList: Game[]) => {
  const isCompleted = !gameList.find(({ status }) => status === Status.NEW);
  const status = isCompleted ? GameListRecordStatus.COMPLETED : GameListRecordStatus.INCOMPLETED;

  const query = `
    UPDATE ${GAMELIST_RECORDS_TABLE}
    SET "status" = $1, "gameList" = $2
    WHERE "recordId" = $3
    RETURNING "recordId";
  `;

  await sql.query(query, [status, JSON.stringify(gameList), recordId]);

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);
};

export const deleteGameListRecord = async (recordId: number) => {
  const query = `
    DELETE FROM ${GAMELIST_RECORDS_TABLE}
    WHERE "recordId" = $1
    RETURNING "recordId";
  `;

  await sql.query(query, [recordId]);

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);
};

export const deleteGameListRecords = async () => {
  const query = `
    DELETE FROM ${GAMELIST_RECORDS_TABLE}
  `;

  await sql.query(query);

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);
};
