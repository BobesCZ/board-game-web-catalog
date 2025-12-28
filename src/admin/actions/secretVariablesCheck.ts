'use server';

import { SecretVariablesCheck, SecretVariablesKeys } from '@/admin/actions/types';

export const getSecretVariablesCheck = async (): Promise<SecretVariablesCheck> => {
  const secretVariablesCheck = Object.keys(SecretVariablesKeys).reduce(
    (res: SecretVariablesCheck, variable) => ({
      ...res,
      [variable]: !!process?.env?.[variable]?.length,
    }),
    {} as SecretVariablesCheck,
  );

  return secretVariablesCheck;
};
