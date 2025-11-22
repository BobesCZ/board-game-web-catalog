import { BGG_CATEGORIES, BGG_MECHANICS, BGG_RANK_NAMES } from './config';

export type CategoryKey = keyof typeof BGG_CATEGORIES;

export type MechanicKey = keyof typeof BGG_MECHANICS;

export type RankNameKey = (typeof BGG_RANK_NAMES)[number];
