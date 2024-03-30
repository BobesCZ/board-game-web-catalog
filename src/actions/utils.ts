'use server';

import { Urls } from '@/config';
import { revalidatePath, revalidateTag } from 'next/cache';
import { CacheTags } from './types';

export const revalidateAllAdminPaths = () => {
  revalidatePath(Urls.ADMIN);
  revalidatePath(Urls.ADMIN_NEW);
  revalidatePath(Urls.ADMIN_USERS);
  revalidatePath(Urls.ADMIN_SETTINGS);
};

export const revalidateAllTags = () => {
  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidateTag(CacheTags.ACTIVE_GAMELIST);
};
