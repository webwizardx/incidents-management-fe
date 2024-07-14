import { Order } from '@/app/types';
import { getSelectOptions } from '@/helpers';
import { Metadata } from 'next';
import Link from 'next/link';
import { Pagination } from '../../components';
import Select from '../../components/Select';
import { getCategories, getIncidents, getStatus } from './actions';
import { QueryIncident } from './types';

export const metadata: Metadata = {
  title: 'Incidencias',
};

const HEADERS = [
  'ID',
  'Título',
  'Categoría',
  'Status',
  'Propietario',
  'Asignado',
  'Acciones',
];

const DEFAULT_QUERY: QueryIncident = {
  include: ['assignee', 'category', 'owner', 'status'],
  limit: 25,
  order: Order.ASC,
  page: 1,
};

export default async function Incidents({
  searchParams = {},
}: {
  searchParams: {
    limit?: number;
    page?: number;
    statusId?: number;
  };
}) {
  const query = { ...DEFAULT_QUERY, ...searchParams };
  query.page = Number(query.page);
  const { data, totalCount } = await getIncidents(query);
  const { data: categories } = await getCategories();
  const { data: status } = await getStatus();
  const badgeColors: Record<string, string> = {
    CLOSED: 'bg-red-100 text-red-700',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    OPEN: 'bg-green-100 text-green-700',
  };
  const statusOptions = getSelectOptions(status, 'name');
  const categoriesOptions = getSelectOptions(categories, 'name');

  return (
    <div className='p-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Incidentes
          </h1>
          <p className='mb-4 mt-2 text-sm text-gray-700'>
            Una lista de todas las incidencias registradas en el sistema.
          </p>
          <div className='flex gap-4'>
            <div className='w-full max-w-xs'>
              <Select
                label='Seleccionar Categoría'
                options={categoriesOptions}
                query='categoryId'
              />
            </div>
            <div className='w-full max-w-xs'>
              <Select
                label='Seleccionar status'
                options={statusOptions}
                query='statusId'
              />
            </div>
          </div>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link
            href={`/incidents/create`}
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Crear Incidente
          </Link>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  {HEADERS.map((header) => (
                    <th
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                      key={header}
                      scope='col'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {data.map((incident) => (
                  <tr key={incident.id}>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {incident.id}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {incident.title}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      <span className='inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700'>
                        {incident.category?.name}
                      </span>
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          badgeColors[incident?.status?.name]
                        }`}
                      >
                        {incident.status?.name}
                      </span>
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {incident.owner?.firstName} {incident.owner?.lastName}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {incident.assignee
                        ? `${incident.assignee.firstName} ${incident.assignee.lastName}`
                        : 'Sin asignar'}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      <span className='isolate inline-flex rounded-md shadow-sm'>
                        <Link
                          className='relative inline-flex items-center rounded-l-md bg-yellow-300 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-yellow-300 transition-colors hover:bg-yellow-400 focus:z-10'
                          href={`/incidents/update/${incident.id}`}
                        >
                          Editar{' '}
                          <span className='sr-only'>, {incident.id}</span>
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination query={query} totalCount={totalCount} />
        </div>
      </div>
    </div>
  );
}
