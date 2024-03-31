import { AppLayout } from '@/layouts/AppLayout';

export default function Loading() {
  return <AppLayout value={{ gameList: [], activeGameListRecord: 0 }} isLoading />;
}
