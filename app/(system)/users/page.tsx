import Select from '@/app/components/Select';
import { Order } from '@/app/types';
import { getSelectOptions } from '@/helpers';
import { Metadata } from 'next';
import Link from 'next/link';
import { Pagination } from '../../components';
import { getRoles, getUsers } from './actions';
import DeleteUserButton from './components/DeleteUserButton';
import { QueryUser } from './types';

export const metadata: Metadata = {
  title: 'Usuarios',
};

const HEADERS = ['ID', 'Nombre', 'Apellido', 'Correo', 'Rol', 'Acciones'];

const DEFAULT_QUERY: QueryUser = {
  include: 'role',
  limit: 25,
  order: Order.ASC,
  page: 1,
};

export default async function Users({
  searchParams = {},
}: {
  searchParams: {
    limit?: number;
    page?: number;
    roleId?: number;
  };
}) {
  const query = { ...DEFAULT_QUERY, ...searchParams };
  query.page = Number(query.page);
  const { data, totalCount } = await getUsers(query);
  const { data: roles } = await getRoles();
  const badgeColors: Record<string, string> = {
    1: 'bg-pink-100 text-pink-700',
    2: 'bg-purple-100 text-purple-700',
    3: 'bg-indigo-100 text-indigo-700',
  };
  const rolesOptions = getSelectOptions(roles, 'name');

  return (
    <div className="p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Usuarios
          </h1>
          <p className="mb-4 mt-2 text-sm text-gray-700">
            Una lista de todos los usuarios registrados en el sistema.
          </p>
          <div className="flex gap-4">
            <div className="w-full max-w-xs">
              <Select
                label="Seleccionar rol"
                options={rolesOptions}
                query="roleId"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href={`/users/create`}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crear usuario
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {HEADERS.map((header) => (
                    <th
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      key={header}
                      scope="col"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap p-2 text-sm">{user.id}</td>
                    <td className="whitespace-nowrap p-2 text-sm">
                      {user.firstName}
                    </td>
                    <td className="whitespace-nowrap p-2 text-sm">
                      {user.lastName}
                    </td>
                    <td className="whitespace-nowrap p-2 text-sm">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap p-2 text-sm capitalize">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          badgeColors[user?.role?.id]
                        }`}
                      >
                        {user.role?.name?.toUpperCase()}
                      </span>
                    </td>
                    <td className="whitespace-nowrap p-2 text-sm">
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        <Link
                          className="relative inline-flex items-center rounded-l-md bg-yellow-300 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-yellow-300 transition-colors hover:bg-yellow-400 focus:z-10"
                          href={`/users/update/${user.id}`}
                        >
                          Editar <span className="sr-only">, {user.id}</span>
                        </Link>
                        <DeleteUserButton user={user} />
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
