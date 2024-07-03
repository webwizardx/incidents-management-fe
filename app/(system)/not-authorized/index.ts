import { redirect } from 'next/navigation';

export function notAuthorized() {
  return redirect('/not-authorized');
}
