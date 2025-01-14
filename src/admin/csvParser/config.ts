import { Lang } from '@/types';

export const VALID_LANGS: Partial<Lang>[] = Object.values(Lang).filter((value) => value !== Lang.All);
