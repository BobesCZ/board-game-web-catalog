import { Session } from 'next-auth';
import { UserAuthRecord } from './types';

export const getUserAuthRecord = ({ user }: Session, userAuthRecords: UserAuthRecord[]) =>
  userAuthRecords.find(({ name, email }) => name === user?.name && email === user.email);

export const getUserAuthRecordByPassword = (
  { username, userPassword }: Record<'username' | 'userPassword', string>,
  userAuthRecords: UserAuthRecord[],
) => userAuthRecords.find(({ name, password }) => name === username && password === userPassword);
