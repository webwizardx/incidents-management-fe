import { notAuthorized } from '@/app/(system)/not-authorized';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { getCategories } from '../../(configuration)/categories/actions';
import { getUsers } from '../../users/actions';
import { User } from '../../users/types';
import { getStatus } from '../actions';
import CreateIncidentForm from '../components/CreateIncidentForm';

export const metadata: Metadata = {
  title: 'Creación de Incidente',
};

export default async function Create() {
  const session: any = await auth();
  const ownerId = session?.user?.id?.toString();
  const [firstName, lastName] = session?.user?.name?.split(' ') || [];
  const isAdmin = session?.user?.role?.id === 1;
  const user = {
    id: session?.user?.id,
    firstName,
    lastName,
  } as User;
  const response = await checkCurrentPermissions({
    action: Action.Create,
    subject: 'incidents',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  const { data: categories } = await getCategories();
  const { data: status } = await getStatus();
  const { data: users } = await getUsers({ pagination: false });
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Incidente
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Esta es la información del incidente.
        </p>
      </div>

      <CreateIncidentForm
        categories={categories}
        isAdmin={isAdmin}
        ownerId={ownerId}
        status={status}
        users={[user, ...users]}
      />
    </div>
  );
}
