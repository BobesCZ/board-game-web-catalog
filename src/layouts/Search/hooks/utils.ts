import { findKey, uniq } from 'lodash-es';
import { CategoryKey, MechanicKey } from '@/bgg/data';
import { ControlleAutocompleteOption, ControlledSelectOption } from '@/components';
import { GameOrdering, GamePlayingTimeType, Lang, MyBggCollection, TFunction } from '@/types';
import { GROUPED_CATEGORIES, GROUPED_MECHANICS } from '../config';
import { CategoryFilters, CategoryGroup, MechanicGroup, PlayersCount } from '../types';
import { GetAutocompleteOptionsProps } from './types';

export const getPlayersCountOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'playersCount'>[] => {
  const values: PlayersCount[] = [0, 1, 200, 2, 3, 4, 5, 6, 7];

  return values.map((value) => ({
    value,
    label: t(`search.form.playersCount.options.${value}`),
  }));
};

export const getPlayingTimeOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'playingTime'>[] =>
  Object.values(GamePlayingTimeType).map((value) => ({
    value,
    label: t(`search.form.playingTime.options.${value}`),
  }));

export const getCategoryGroup = (value: string): string =>
  findKey(GROUPED_CATEGORIES, (item) => item?.includes(value as CategoryKey)) || CategoryGroup.Other;

export const getMechanicGroup = (value: string): string =>
  findKey(GROUPED_MECHANICS, (item) => item?.includes(value as MechanicKey)) || MechanicGroup.Other;

export const getLangOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'lang'>[] =>
  Object.values(Lang)
    .filter((value) => value !== Lang.Irrelevant)
    .map((value) => ({
      value,
      label: t(`search.form.lang.options.${value.toLowerCase()}`),
    }));

export const getAutocompleteOptions = ({
  gameList,
  t,
  locale,
  key,
  getGroup,
  GroupEnum,
}: GetAutocompleteOptionsProps): ControlleAutocompleteOption[] => {
  const uniqItems = uniq((gameList || []).flatMap((game) => game[key])).filter(
    (i): i is CategoryKey | MechanicKey => i !== undefined,
  );

  const options = uniqItems.map((value: string): ControlleAutocompleteOption => {
    const group = getGroup(value);

    return {
      value,
      label: t(`bgg.${key}.${value}`) || value,
      group: group,
      groupLabel: t(`search.form.${key}.groups.${group}`) || '',
    };
  });

  const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label, locale));

  return Object.values(GroupEnum).reduce(
    (acc: ControlleAutocompleteOption[], group) => [...acc, ...sortedOptions.filter((game) => game.group === group)],
    [],
  );
};

export const getOrderingOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'ordering'>[] =>
  Object.values(GameOrdering).map((value) => ({
    value,
    label: t(`search.form.ordering.options.${value}`),
  }));

export const getBggStatusOptions = (t: TFunction): ControlledSelectOption<CategoryFilters, 'bggStatus'>[] =>
  Object.values(MyBggCollection).map((value) => ({
    value,
    label: t(`myBgg.collection.${value}`),
  }));
