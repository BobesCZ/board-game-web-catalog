'use client';

import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { createUserAuthRecord } from '@/admin/actions';
import { UseUserAuthReturn, UserAuthRecord } from './types';
import { getUserAuthRecord } from './utils';

export const useUserAuth = (userAuthRecords: UserAuthRecord[]): UseUserAuthReturn => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const userAuthRecord = !session ? null : getUserAuthRecord(session, userAuthRecords);

  const handleCreateUserAuth = async () => {
    if (!session?.user) return;
    startTransition(() => createUserAuthRecord(session.user));
  };

  return { userAuthRecord, handleCreateUserAuth, isPending };
};
