import { Lang } from '@/types';

export const COUNTRY_FLAG_BY_LANG: Record<Exclude<Lang, 'All' | 'Irrelevant'>, string> = {
  CZ: 'cz',
  ENG: 'uk',
  DE: 'de',
};
