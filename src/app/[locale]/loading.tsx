import { AppLayout } from '@/layouts';

export default function Loading() {
  return <AppLayout value={{ gameList: [], activeGameListRecord: 0 }} isLoading />;
}
