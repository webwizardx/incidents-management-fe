import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { notAuthorized } from '../not-authorized';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await checkCurrentPermissions({
    action: Action.Manage,
    subject: 'users',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  return <>{children}</>;
}
