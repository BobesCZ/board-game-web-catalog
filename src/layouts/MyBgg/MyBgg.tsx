'use client';

import { AppTabs, CollectionLoader, MyBggProfile, PageTitle } from '@/components';

import { useMyBggCollection } from '@/components/collection-loader/useMyBggCollection';

export default function MyBgg() {
  const { myBggCollection } = useMyBggCollection();

  return (
    <>
      <PageTitle i18nKey="myBgg.pageTitle" />
      <AppTabs />

      {!myBggCollection ? <CollectionLoader /> : <MyBggProfile />}
    </>
  );
}
