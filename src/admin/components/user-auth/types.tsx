export enum UserAuthStatus {
  Waiting = 'WAITING',
  Authorized = 'AUTHORIZED',
}

export type UserAuthRecord = {
  recordId: number;
  status: `${UserAuthStatus}`;
  name: string;
  email?: string;
  password?: string;
};

export type UseUserAuthReturn = {
  userAuthRecord: UserAuthRecord | null | undefined;
  handleCreateUserAuth: () => Promise<void>;
  isPending: boolean;
};
