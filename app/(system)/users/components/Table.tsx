'use client';

import { Order } from '@/app/types';
import { useEffect, useState } from 'react';
import { Pagination } from '../../components';
import { deleteUser, getUsers } from '../api';
import { QueryUser, User } from '../types';
import UserFormModal from './UserFormModal';

const HEADERS = ['ID', 'Nombre', 'Apellido', 'Correo', 'Rol', 'Acciones'];

export const DEFAULT_QUERY: QueryUser = {
  include: 'role',
  limit: 3,
  order: Order.ASC,
  page: 1,
};

export default function Table() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<QueryUser>(DEFAULT_QUERY);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setQuery({ ...DEFAULT_QUERY });
  };

  const openEditUserModal = (user: User) => {
    setUser(user);
    setIsOpen(true);
  };

  const openCreateUserModal = () => {
    setUser(null);
    setIsOpen(true);
  };

  useEffect(() => {
    getUsers(query).then(({ data, totalCount }) => {
      setUsers(data);
      setTotalCount(totalCount || 0);
    });
  }, [query]);

  return (
    <div>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Usuarios
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            Una lista de todos los usuarios registrados en el sistema.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={openCreateUserModal}
          >
            Crear usuario
          </button>
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className='whitespace-nowrap p-2 text-sm'>{user.id}</td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {user.firstName}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {user.lastName}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      {user.email}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm capitalize'>
                      {user.role?.name}
                    </td>
                    <td className='whitespace-nowrap p-2 text-sm'>
                      <span className='isolate inline-flex rounded-md shadow-sm'>
                        <button
                          type='button'
                          className='relative inline-flex items-center rounded-l-md bg-yellow-300 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-yellow-300 transition-colors hover:bg-yellow-400 focus:z-10'
                          onClick={() => openEditUserModal(user)}
                        >
                          Editar <span className='sr-only'>, {user.id}</span>
                        </button>
                        <button
                          type='button'
                          className='relative -ml-px inline-flex items-center rounded-r-md bg-red-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-red-600 transition-colors hover:bg-red-700 focus:z-10'
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Borrar <span className='sr-only'>, {user.id}</span>
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            query={query}
            setQuery={setQuery}
            totalCount={totalCount}
          />
          <UserFormModal
            isOpen={isOpen}
            onClose={setIsOpen}
            setQuery={setQuery}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}
