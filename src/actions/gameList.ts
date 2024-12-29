'use server';

import { kv } from '@vercel/kv';
import { unstable_cache } from 'next/cache';
import { Game } from '@/types';
import { getActiveGameListRecord } from './activeGameListRecord';
import { GAMELIST_RECORDS_KEY } from './config';
import { CacheTags, GameListRecord } from './types';

const getGameListPromise = async (): Promise<Game[]> => {
  const activeGameListRecord = await getActiveGameListRecord();

  const [_key, results] = await kv.zscan(GAMELIST_RECORDS_KEY, 0, {
    match: `*${activeGameListRecord}*`,
  });

  const gameList = (results[0] as unknown as GameListRecord)?.gameList;

  return gameList;
};

export const getGameList = unstable_cache(getGameListPromise, ['getGameList'], {
  tags: [CacheTags.ACTIVE_GAMELIST],
});
