import { IncidentsStatusChart } from './components';
import {
  getAssignedIncidentsCountForChart,
  getIncidentsStatusCountForChart,
} from './components/actions';
import AssignedIncidentsChart from './components/AssignedIncidentsChart';

export default async function Reports() {
  const incidentsStatusCount =
    Object.values(await getIncidentsStatusCountForChart()) || null;
  const assignedIncidentsChart =
    Object.values(await getAssignedIncidentsCountForChart())?.toReversed() ||
    null;

  return (
    <div className="p-8">
      <div className="mb-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Reportes
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-20">
        <IncidentsStatusChart
          data={incidentsStatusCount}
          exportUrl={`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/status-count-for-chart/export/pdf`}
        />
        <AssignedIncidentsChart
          data={assignedIncidentsChart}
          exportUrl={`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/assigned-incidents-count-for-chart/export/pdf`}
        />
      </div>
    </div>
  );
}
