'use server';

import { neon } from '@neondatabase/serverless';
import { Session } from 'next-auth';
import { UserAuthRecord, UserAuthStatus } from '@/admin/components';
import { USER_AUTH_RECORDS_TABLE } from './config';
import { createTables, revalidateAllAdminPaths } from './utils';

const sql = neon(process.env.DATABASE_URL ?? '');

export const getUserAuthRecords = async (): Promise<UserAuthRecord[]> => {
  const query = `SELECT * FROM ${USER_AUTH_RECORDS_TABLE}`;

  return (await sql(query)) as UserAuthRecord[];
};

export const getUserAuthRecordsWithFallback = async () => {
  try {
    const userAuthRecords = await getUserAuthRecords();

    return userAuthRecords;
  } catch {
    await createTables();
    const userAuthRecords = await getUserAuthRecords();

    return userAuthRecords;
  }
};

export const createUserAuthRecord = async (user: Session['user'], password?: string) => {
  const userAuthRecord: Partial<UserAuthRecord> = {
    status: UserAuthStatus.Waiting,
    name: user?.name || '--',
    email: user?.email ?? undefined,
    password,
  };

  const { columns, values } = Object.entries(userAuthRecord).reduce(
    (res, [key, value]) => {
      res.columns.push(`"${key}"`);
      res.values.push(value === null || value === undefined ? 'NULL' : `'${String(value).replace(/'/g, "''")}'`);

      return res;
    },
    { columns: [] as string[], values: [] as any[] },
  );

  const query = `
    INSERT INTO ${USER_AUTH_RECORDS_TABLE} (${columns.join(', ')})
    VALUES (${values.join(', ')})
  `;

  await sql(query);

  revalidateAllAdminPaths();
};

export const authorizeUserAuthRecord = async (recordId: number) => {
  const status = UserAuthStatus.Authorized;

  const query = `
    UPDATE ${USER_AUTH_RECORDS_TABLE}
    SET "status" = $1
    WHERE "recordId" = $2
    RETURNING "recordId";
  `;

  await sql(query, [status, recordId]);

  revalidateAllAdminPaths();
};

export const deleteUserAuthRecord = async (recordId: number) => {
  const query = `
     DELETE FROM ${USER_AUTH_RECORDS_TABLE}
     WHERE "recordId" = $1
     RETURNING "recordId";
   `;

  await sql(query, [recordId]);

  revalidateAllAdminPaths();
};
