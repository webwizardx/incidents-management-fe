import { notAuthorized } from '@/app/(system)/not-authorized';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { Metadata } from 'next';
import { getRoles } from '../actions';
import UserForm from '../components/UserForm';

export const metadata: Metadata = {
  title: 'Creación de Usuario',
};

export default async function Create() {
  const response = await checkCurrentPermissions({
    action: Action.Manage,
    subject: 'users',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  const { data: roles } = await getRoles();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Usuario
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Esta es la información del usuario.
        </p>
      </div>

      <UserForm roles={roles} />
    </div>
  );
}
