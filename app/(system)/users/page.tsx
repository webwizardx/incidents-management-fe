import { Metadata } from 'next';
import Table from './components/Table';

export const metadata: Metadata = {
  title: 'Usuarios',
};

export default async function Users() {
  return (
    <div className='p-8'>
      <Table />
    </div>
  );
}
