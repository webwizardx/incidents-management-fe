import { Action } from '../enum/action.enum';

export type CheckCurrentPermissionsQuery = {
  action: Action;
  subject: string;
};

export type CheckPermissionsResponse = {
  action: Action;
  hasPermission: boolean;
  subject: string;
};

export type GetUserPermissionsResponse = {
  action: Action;
  id: number;
  subject: string;
};
