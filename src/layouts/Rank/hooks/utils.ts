import { BGG_RANK_NAMES } from '@/bgg/data';
import { ControlledSelectOption } from '@/components';
import { TFunction } from '@/types';
import { RankFilters } from '../types';

export const getRankNameOptions = (t: TFunction): ControlledSelectOption<RankFilters, 'rankName'>[] =>
  Object.values(BGG_RANK_NAMES).map((value) => ({
    value,
    label: t(`rank.form.rankName.options.${value}`),
  }));
