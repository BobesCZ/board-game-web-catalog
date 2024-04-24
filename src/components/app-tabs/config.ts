import { Urls } from '@/config';
import { AppTab } from './types';

export const APP_TABS: AppTab[] = [
  {
    url: Urls.SEARCH,
    label: 'search.tabLabel',
  },
  {
    url: Urls.NAME,
    label: 'name.tabLabel',
  },
  {
    url: Urls.RANK,
    label: 'rank.tabLabel',
  },
  {
    url: Urls.ADDED,
    label: 'added.tabLabel',
  },
];
