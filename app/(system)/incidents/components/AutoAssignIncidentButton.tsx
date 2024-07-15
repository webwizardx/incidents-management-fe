'use client';

import { autoAssignIncidentToUser } from '../actions';
import { Incident } from '../types';

type Props = {
  incident: Incident;
};

export default function AutoAssignIncidentButton({ incident }: Props) {
  return (
    <button
      type="button"
      className="relative -ml-px inline-flex items-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-indigo-600 transition-colors hover:bg-indigo-500 focus:z-10"
      onClick={() => autoAssignIncidentToUser(incident.id)}
    >
      Auto Asignar Incidente <span className="sr-only">, {incident.id}</span>
    </button>
  );
}
