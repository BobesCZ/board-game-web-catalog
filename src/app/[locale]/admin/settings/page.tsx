import { getSecretVariablesCheck } from '@/admin/actions';
import { Settings } from '@/admin/layouts';

export default async function SettingsPage() {
  const secretVariablesCheck = await getSecretVariablesCheck();

  return <Settings secretVariablesCheck={secretVariablesCheck} />;
}
