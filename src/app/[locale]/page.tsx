import { getActiveGameListRecord } from '@/admin/actions';
import { AppLayout, Search } from '@/layouts';

export default async function SearchPage() {
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout activeGameListRecord={activeGameListRecord}>
      <Search />
    </AppLayout>
  );
}
