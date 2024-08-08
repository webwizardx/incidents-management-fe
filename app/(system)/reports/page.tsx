import { IncidentsStatusChart } from './components';
import { getIncidentsStatusCountForChart } from './components/actions';

export default async function Reports() {
  const response = await getIncidentsStatusCountForChart();
  const data = Object.values(response) || null;

  return (
    <div className="p-8">
      <div className="mb-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Reportes
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <IncidentsStatusChart data={data} />
      </div>
    </div>
  );
}
