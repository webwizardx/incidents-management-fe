'use client';

import { deleteUser } from '../actions';
import { User } from '../types';

type Props = {
  user: User;
};

export default function DeleteUserButton({ user }: Props) {
  return (
    <button
      type="button"
      className="relative -ml-px inline-flex items-center rounded-r-md bg-red-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-red-600 transition-colors hover:bg-red-700 focus:z-10"
      onClick={() => deleteUser(user.id)}
    >
      Borrar <span className="sr-only">, {user.id}</span>
    </button>
  );
}
