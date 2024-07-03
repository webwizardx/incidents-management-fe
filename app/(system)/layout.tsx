import { auth } from '@/auth';
import { Sidebar } from '../components';
import { getUserPermissions } from '../login/actions';
export default async function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const permissions = await getUserPermissions();
  return (
    <div>
      <Sidebar permissions={permissions} session={session} />
      <div className='lg:pl-72'>
        <main className=''>{children}</main>
      </div>
    </div>
  );
}
