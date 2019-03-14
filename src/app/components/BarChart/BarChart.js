import styles from './BarChart.module.scss'
import React from 'react'
import cx from 'classnames'

import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({
  className,
  data,
  xAxis,
  ...restProps
  }) => {

  return (
    <div className={cx(styles.root)}>
    {data &&
      <ResponsiveBar
        data={data}
        keys={[
          "reports",
          "active",
          "missions",
          "invalid",
        ]}
        indexBy="date"
        margin={{
          "top": 50,
          "right": 30,
          "bottom": 100,
          "left": 45
        }}
        padding={0.3}
        colors="nivo"
        colorBy="id"
        defs={[
          {
            "id": "dots",
            "type": "patternDots",
            "background": "inherit",
            "color": "#c6a58a",
            "size": 3,
            "padding": 1,
            "stagger": true
          },
          {
            "id": "lines",
            "type": "patternLines",
            "background": "inherit",
            "color": "#eed312",
            "rotation": -45,
            "lineWidth": 3,
            "spacing": 10
          }
        ]}
        fill={[
          {
            "match": {
              "id": "reports"
            },
            "id": "dots"
          },
          {
            "match": {
              "id": "invalid"
            },
            "id": "lines"
          }
        ]}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": xAxis,
          "legendPosition": "middle",
          "legendOffset": 40
        }}
        axisLeft={{
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          // "legend": "food",
          // "legendPosition": "middle",
          "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            "dataFrom": "keys",
            "anchor": "bottom-left",
            "direction": "row",
            "justify": false,
            "translateX": 0,
            "translateY": 80,
            "itemsSpacing": 2,
            "itemWidth": 100,
            "itemHeight": 20,
            "itemDirection": "left-to-right",
            "itemOpacity": 0.85,
            "symbolSize": 20,
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemOpacity": 1
                }
              }
            ]
          }
        ]}
      />
    }
    </div>
  )
}

export default BarChart