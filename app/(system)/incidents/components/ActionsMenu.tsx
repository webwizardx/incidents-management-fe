'use client';

import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from '@headlessui/react';
import {
  ArrowPathIcon,
  ChevronDownIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import {
  autoAssignIncidentToUser,
  deleteIncident,
  patchIncident,
} from '../actions';
import { Incident } from '../types';

type Props = {
  incident: Incident;
  roleId: number;
};

export default function ActionsMenu({ incident, roleId }: Props) {
  return (
    <div>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 transition-colors focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Acciones
          <ChevronDownIcon className="block h-4 w-4 fill-white" />
        </MenuButton>
        <MenuItems
          transition
          anchor="left"
          className="origin-top-right rounded-xl border border-white bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuSection>
            <MenuHeading as="span" className="ml-2 text-sm">
              Datos
            </MenuHeading>
            <MenuItem>
              <Link
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                href={`/incidents/update/${incident.id}`}
              >
                <PencilIcon className="h-4 w-4 fill-white" />
                Editar <span className="sr-only">, {incident.id}</span>
              </Link>
            </MenuItem>
            {roleId === 1 ? (
              <>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                    onClick={() => autoAssignIncidentToUser(incident.id)}
                    type="button"
                  >
                    <UserGroupIcon className="h-4 w-4 fill-white" />
                    Auto Asignar Incidente <span className="sr-only"></span>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                    onClick={() => deleteIncident(incident.id)}
                    type="button"
                  >
                    <TrashIcon className="h-4 w-4 fill-white" />
                    Borrar
                  </button>
                </MenuItem>
              </>
            ) : null}
          </MenuSection>
          {roleId !== 3 ? (
            <>
              <MenuSeparator className="my-1 h-px bg-gray-200" />
              <MenuSection>
                <MenuHeading as="span" className="ml-2 text-sm">
                  Status
                </MenuHeading>
                {roleId === 1 ? (
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                      onClick={() =>
                        patchIncident(incident.id, {
                          statusId: 1,
                        })
                      }
                      type="button"
                    >
                      <LockOpenIcon className="h-4 w-4 fill-white" />
                      Marcar status como Abierto
                    </button>
                  </MenuItem>
                ) : null}
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                    onClick={() =>
                      patchIncident(incident.id, {
                        statusId: 2,
                      })
                    }
                    type="button"
                  >
                    <ArrowPathIcon className="h-4 w-4 fill-white" />
                    Marcar status como En progreso
                  </button>
                </MenuItem>
                {roleId === 1 ? (
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                      onClick={() =>
                        patchIncident(incident.id, {
                          statusId: 3,
                          closedAt: new Date().toISOString(),
                        })
                      }
                      type="button"
                    >
                      <LockClosedIcon className="h-4 w-4 fill-white" />
                      Marcar status como Cerrado
                    </button>
                  </MenuItem>
                ) : null}
              </MenuSection>
            </>
          ) : null}
        </MenuItems>
      </Menu>
    </div>
  );
}
