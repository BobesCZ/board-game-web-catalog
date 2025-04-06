import { getWebEventRecords } from '@/admin/actions';
import { WebEvents } from '@/admin/layouts';

export default async function WebEventsPage() {
  const webEventsRecords = await getWebEventRecords();

  return <WebEvents webEventsRecords={webEventsRecords} />;
}
