'use client';

import { deleteIncident } from '../actions';
import { Incident } from '../types';

type Props = {
  incident: Incident;
};

export default function DeleteIncidentButton({ incident }: Props) {
  return (
    <button
      type="button"
      className="relative -ml-px inline-flex items-center rounded-r-md bg-red-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-red-600 transition-colors hover:bg-red-700 focus:z-10"
      onClick={() => deleteIncident(incident.id)}
    >
      Borrar <span className="sr-only">, {incident.id}</span>
    </button>
  );
}
