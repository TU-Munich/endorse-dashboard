import React from 'react'
import { Chart } from 'react-charts';
import ChartConfig from "./ChartConfig";

export default () => (
  <div>
    <ChartConfig series={10}>
      {({ data }) => (
        <Chart
          data={data}
          series={{ type: 'area' }}
          axes={[
            { primary: true, position: 'bottom', type: 'time' },
            { position: 'left', type: 'linear', stacked: true },
          ]}
          primaryCursor
          secondaryCursor
          tooltip
        />
      )}
    </ChartConfig>
  </div>
)
