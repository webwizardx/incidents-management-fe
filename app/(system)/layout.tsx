import { auth } from '@/auth';
import { Sidebar } from './components';
export default async function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div>
      <Sidebar session={session} />
      <div className='lg:pl-72'>
        <main className=''>{children}</main>
      </div>
    </div>
  );
}
