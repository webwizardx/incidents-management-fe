import { notAuthorized } from '@/app/(system)/not-authorized';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { getCategories, getStatus } from '../actions';
import CreateIncidentForm from '../components/CreateIncidentForm';

export const metadata: Metadata = {
  title: 'Creación de Incidente',
};

export default async function CreateIncident() {
  const session: any = await auth();
  const ownerId = session?.user?.id?.toString();
  const response = await checkCurrentPermissions({
    action: Action.Create,
    subject: 'incidents',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  const { data: categories } = await getCategories();
  const { data: status } = await getStatus();

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
          ownerId={ownerId}
          status={status}
        />
      </div>
    </div>
  );
}
