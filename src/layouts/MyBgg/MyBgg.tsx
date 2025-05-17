'use client';

import { AppTabs, PageTitle } from '@/components';
import { useAppStore } from '@/store';
import { CollectionLoader, MyBggProfile } from './components';

export function MyBgg() {
  const { myBggData } = useAppStore();

  return (
    <>
      <PageTitle i18nKey="myBgg.pageTitle" />
      <AppTabs />

      {!myBggData ? <CollectionLoader /> : <MyBggProfile />}
    </>
  );
}
