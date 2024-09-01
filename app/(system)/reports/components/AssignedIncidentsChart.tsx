'use client';

import { FolderArrowDownIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { ChartData } from './types';

const DEFAULT_DATA: ChartData[] = [];

type Props = {
  data?: ChartData[];
  exportUrl?: string;
};

export default function AssignedTicketsChart({
  data = DEFAULT_DATA,
  exportUrl,
}: Props) {
  const primaryAxis = useMemo(
    (): AxisOptions<ChartData['data'][number]> => ({
      getValue: (data) => data.label,
      position: 'left',
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ChartData['data'][number]>[] => [
      {
        getValue: (data) => data.data,
        min: 0,
        tickCount: 5,
        position: 'bottom',
      },
    ],
    []
  );

  return (
    <div className="relative h-60 w-full">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
      <a
        className="absolute -top-8 right-2 flex gap-2"
        href={exportUrl}
        target="_blank"
        download={true}
      >
        Exportar a PDF
        <FolderArrowDownIcon className="h-6 w-6 text-gray-900" />
      </a>
    </div>
  );
}
