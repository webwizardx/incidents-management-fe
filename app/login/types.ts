import { Action } from '../enum/action.enum';

export type CheckPermissionsQuery = {
  id: number;
  action: Action;
  subject: string;
};

export type CheckPermissionsResponse = {
  action: Action;
  hasPermission: boolean;
  subject: string;
};
