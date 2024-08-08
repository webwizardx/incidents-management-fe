'use client';

import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { Data } from './types';

const DEFAULT_DATA: Data[] = [
  {
    label: 'Cerrado',
    data: [
      {
        label: 'Cerrado',
        data: 0,
      },
    ],
  },
  {
    label: 'En Progreso',
    data: [
      {
        label: 'En Progreso',
        data: 0,
      },
    ],
  },
  {
    label: 'Abierto',
    data: [
      {
        label: 'Abierto',
        data: 0,
      },
    ],
  },
];

type Props = {
  data?: Data[];
};

export default function IncidentsStatusChart({ data = DEFAULT_DATA }: Props) {
  const primaryAxis = useMemo(
    (): AxisOptions<Data['data'][number]> => ({
      getValue: (data) => data.label,
      position: 'left',
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Data['data'][number]>[] => [
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
    <div className="h-60 w-full">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}
