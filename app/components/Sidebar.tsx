'use client';

import { logout } from '@/app/login/actions';
import { classNames } from '@/helpers';
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  Bars3Icon,
  ChartPieIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  TicketIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Action } from '../enum/action.enum';
import {
  CheckCurrentPermissionsQuery,
  GetUserPermissionsResponse,
} from '../login/types';
import DefaultUserSVG from './DefaultUserSVG';

const navigation: {
  href: string;
  icon: any;
  name: string;
  requiredPermissions?: CheckCurrentPermissionsQuery[];
}[] = [
  {
    href: '/incidents',
    icon: TicketIcon,
    name: 'Incidencias',
    requiredPermissions: [
      {
        action: Action.Read,
        subject: 'Incidents',
      },
    ],
  },
  {
    href: '/reports',
    icon: ChartPieIcon,
    name: 'Reportes',
  },
  {
    href: '/users',
    icon: UsersIcon,
    name: 'Usuarios',
    requiredPermissions: [
      {
        action: Action.Manage,
        subject: 'users',
      },
    ],
  },
];

type Props = {
  closeSidebar: () => void;
  permissions?: GetUserPermissionsResponse[];
  session: Session | null;
};

export function NavigationLinks({
  closeSidebar,
  permissions = [],
}: Omit<Props, 'session'>) {
  const pathname = usePathname();

  const hasPermissionsToRoute = (
    permissions: GetUserPermissionsResponse[],
    requiredPermissions?: CheckCurrentPermissionsQuery[]
  ) => {
    if (!requiredPermissions) return true;

    for (const requiredPermission of requiredPermissions) {
      const hasPermission = permissions.some((permission) => {
        return (
          (permission.action === Action.Manage ||
            permission.action === requiredPermission.action) &&
          (/all/i.test(permission.subject) ||
            permission.subject === requiredPermission.subject)
        );
      });

      if (!hasPermission) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      {navigation
        .filter((item) =>
          hasPermissionsToRoute(permissions, item.requiredPermissions)
        )
        .map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={classNames(
                pathname.includes(item.href)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
              )}
              onClick={closeSidebar}
            >
              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          </li>
        ))}
    </>
  );
}

export default function Sidebar({
  permissions = [],
  session,
}: Omit<Props, 'closeSidebar'>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 lg:hidden">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Cerrar barra lateral</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="relative flex h-16 shrink-0 items-center">
                    <Image
                      alt="Your Company"
                      fill={true}
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <NavigationLinks
                            closeSidebar={() => setSidebarOpen(false)}
                            permissions={permissions}
                          />
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <Link
                          href="/categories"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          Configuración
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="relative flex h-16 shrink-0 items-center">
            <Image
              alt="Your Company"
              fill={true}
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <NavigationLinks
                    closeSidebar={() => setSidebarOpen(false)}
                    permissions={permissions}
                  />
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Configuración
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir barra lateral</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />
              {/* Profile dropdown */}
              <Menu as="div" className="relative" data-cy="avatar-menu">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Abrir menú de usuario</span>
                  <DefaultUserSVG className="h-8 w-8" />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      {session?.user?.name}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <form action={logout}>
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            className={classNames(
                              focus ? 'bg-gray-50' : '',
                              'block w-full px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                            data-cy={'logout-button'}
                          >
                            Cerrar sesión
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </form>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
