'use server';

import { kv } from '@vercel/kv';
import { Session } from 'next-auth';
import { UserAuthRecord, UserAuthStatus } from '@/admin/components';
import { USER_AUTH_RECORDS_KEY } from './config';
import { revalidateAllAdminPaths } from './utils';

export const getUserAuthRecords = async (): Promise<UserAuthRecord[]> => await kv.zrange(USER_AUTH_RECORDS_KEY, 0, -1);

export const createUserAuthRecord = async (user: Session['user'], password?: string) => {
  const recordId = Date.now();

  const userAuthRecord: UserAuthRecord = {
    recordId,
    status: UserAuthStatus.Waiting,
    user: {
      name: user?.name || '--',
      email: user?.email || '--',
    },
    password,
  };

  await kv.zadd<UserAuthRecord>(USER_AUTH_RECORDS_KEY, { nx: true }, { score: recordId, member: userAuthRecord });

  revalidateAllAdminPaths();
};

export const authorizeUserAuthRecord = async (record: UserAuthRecord) => {
  const userAuthRecord: UserAuthRecord = {
    ...record,
    status: UserAuthStatus.Authorized,
  };

  await kv.zremrangebyscore(USER_AUTH_RECORDS_KEY, record.recordId, record.recordId);
  await kv.zadd<UserAuthRecord>(USER_AUTH_RECORDS_KEY, {
    score: record.recordId,
    member: userAuthRecord,
  });

  revalidateAllAdminPaths();
};

export const deleteUserAuthRecord = async (recordId: number) => {
  await kv.zremrangebyscore(USER_AUTH_RECORDS_KEY, recordId, recordId);

  revalidateAllAdminPaths();
};
