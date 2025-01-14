'use client';

import { UserAuthRecord } from '@/admin/components';
import { UserAuthRecords } from './components';

type Props = {
  userAuthRecords: UserAuthRecord[];
};

export const Users = ({ userAuthRecords }: Props) => <UserAuthRecords userAuthRecords={userAuthRecords} />;
