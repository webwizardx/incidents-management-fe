import { Order } from '@/app/types';
import { Metadata } from 'next';
import Link from 'next/link';
import { Pagination } from '../../../components';
import { getCategories } from './actions';
import DeleteCategoryButton from './components/DeleteCategoryButton';
import { QueryCategory } from './types';

export const metadata: Metadata = {
  title: 'Categorías',
};

const HEADERS = ['ID', 'Nombre', 'Acciones'];

const DEFAULT_QUERY: QueryCategory = {
  limit: 25,
  name: '',
  order: Order.ASC,
  orderBy: 'id',
  page: 1,
};

export default async function categorys({
  searchParams = {},
}: {
  searchParams: {
    limit?: number;
    page?: number;
    name?: string;
  };
}) {
  const query = { ...DEFAULT_QUERY, ...searchParams };
  query.page = Number(query.page);
  const { data, totalCount } = await getCategories(query);

  return (
    <div className="p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Categorías
          </h1>
          <p className="mb-4 mt-2 text-sm text-gray-700">
            Una lista de todas las categorías.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href={`/categories/create`}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crear Categoría
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
                {data.map((category) => (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap p-2 text-sm">
                      {category.id}
                    </td>
                    <td className="whitespace-nowrap p-2 text-sm">
                      {category.name}
                    </td>
                    <td className="whitespace-nowrap p-2 text-sm">
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        <Link
                          className="relative inline-flex items-center rounded-l-md bg-yellow-300 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-yellow-300 transition-colors hover:bg-yellow-400 focus:z-10"
                          href={`/categories/update/${category.id}`}
                        >
                          Editar{' '}
                          <span className="sr-only">, {category.id}</span>
                        </Link>
                        <DeleteCategoryButton category={category} />
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
