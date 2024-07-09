import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { notAuthorized } from '../not-authorized';

export default async function IncidentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await checkCurrentPermissions({
    action: Action.Read,
    subject: 'incidents',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  return <>{children}</>;
}
