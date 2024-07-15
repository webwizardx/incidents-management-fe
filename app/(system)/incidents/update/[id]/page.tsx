import { notAuthorized } from '@/app/(system)/not-authorized';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { getUsers } from '../../../users/actions';
import { getCategories, getIncident, getStatus } from '../../actions';
import IncidentForm from '../../components/IncidentForm';

export const metadata: Metadata = {
  title: 'Actualización de Incidente',
};

export default async function UpdateIncident({
  params: { id },
}: {
  params: { id: number };
}) {
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
  const { data: users } = await getUsers();
  const incident = await getIncident(id);
  const initialValues = {
    ...incident,
    assignedTo: incident.assignedTo?.toString() || '',
    categoryId: incident.categoryId.toString(),
    closedAt: incident.closedAt || '',
    ownerId: incident.ownerId.toString(),
    statusId: incident.statusId.toString(),
  };

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

      <IncidentForm
        categories={categories}
        incidentId={id}
        initialValues={initialValues}
        ownerId={ownerId}
        status={status}
        users={users}
      />
    </div>
  );
}