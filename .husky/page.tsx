import { notAuthorized } from '@/app/(system)/not-authorized';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { getCategories } from '../app/(system)/(configuration)/categories/actions';
import { getStatus } from '../app/(system)/incidents/actions';
import CreateIncidentForm from '../app/(system)/incidents/components/CreateIncidentForm';
import { getUsers } from '../app/(system)/users/actions';
import { User } from '../app/(system)/users/types';

export const metadata: Metadata = {
  title: 'Creación de Incidente',
};

export default async function CreateIncident() {
  const session: any = await auth();
  const ownerId = session?.user?.id?.toString();
  const isAdmin = session?.user?.role?.id === 1;
  const [firstName, lastName] = session?.user?.name?.split(' ') || [];
  const user = {
    id: ownerId,
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
  const { data: users } = await getUsers({ roleId: 2 });
  return (
    <div className="grid p-8">
      <div className="mb-4 px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Incidente
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Esta es la información del incidente.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <CreateIncidentForm
          categories={categories}
          isAdmin={isAdmin}
          ownerId={ownerId}
          status={status}
          users={[user, ...users]}
        />
      </div>
    </div>
  );
}
