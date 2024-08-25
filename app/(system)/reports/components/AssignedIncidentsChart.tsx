'use client';

import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { ChartData } from './types';

const DEFAULT_DATA: ChartData[] = [];

type Props = {
  data?: ChartData[];
};

export default function AssignedTicketsChart({ data = DEFAULT_DATA }: Props) {
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
