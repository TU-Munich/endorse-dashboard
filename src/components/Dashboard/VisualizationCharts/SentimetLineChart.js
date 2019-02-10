import React from 'react'
import { Chart } from 'react-charts';
import ChartConfig from "./ChartConfig";

export default () => (
  <div>
    <ChartConfig series={10}>
      {({ data }) => (
        <Chart
          data={data}
          series={{
            showPoints: false,
          }}
          axes={[
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' },
          ]}
          tooltip
        />
      )}
    </ChartConfig>
  </div>
)
