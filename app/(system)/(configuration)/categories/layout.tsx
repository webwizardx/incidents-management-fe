import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { notAuthorized } from '../../not-authorized';

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await checkCurrentPermissions({
    action: Action.Manage,
    subject: 'categories',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  return <>{children}</>;
}
