import styles from './LineChart.module.scss'
import React from 'react'
import cx from 'classnames'

import { ResponsiveLine } from '@nivo/line'

const LineChart = ({
  className,
  ...restProps
  }) => {

  let [data, setData] = React.useState()

  React.useEffect(() => {
    setData([
      {
        "id": "Reports",
        "color": "hsl(136, 70%, 50%)",
        "data": [
          {
            "x": "Jan",
            "y": 208
          },
          {
            "x": "Feb",
            "y": 123
          },
          {
            "x": "Mar",
            "y": 108
          },
          {
            "x": "Apr",
            "y": 170
          },
          {
            "x": "May",
            "y": 1
          },
          {
            "x": "Jun",
            "y": 69
          },
          {
            "x": "Jul",
            "y": 213
          },
          {
            "x": "Aug",
            "y": 0
          },
          {
            "x": "Sep",
            "y": 0
          },
          {
            "x": "Oct",
            "y": 0
          },
          {
            "x": "Nov",
            "y": 0
          },
          {
            "x": "Dec",
            "y": 0
          }
        ]
      },
      {
        "id": "Users",
        "color": "hsl(136, 70%, 50%)",
        "data": [
          {
            "x": "Jan",
            "y": 103
          },
          {
            "x": "Feb",
            "y": 23
          },
          {
            "x": "Mar",
            "y": 110
          },
          {
            "x": "Apr",
            "y": 206
          },
          {
            "x": "May",
            "y": 56
          },
          {
            "x": "Jun",
            "y": 155
          },
          {
            "x": "Jul",
            "y": 85
          },
          {
            "x": "Aug",
            "y": 0
          },
          {
            "x": "Sep",
            "y": 0
          },
          {
            "x": "Oct",
            "y": 0
          },
          {
            "x": "Nov",
            "y": 0
          },
          {
            "x": "Dec",
            "y": 0
          }
        ]
      },
      {
        "id": "Missions",
        "color": "hsl(121, 70%, 50%)",
        "data": [
          {
            "x": "Jan",
            "y": 149
          },
          {
            "x": "Feb",
            "y": 267
          },
          {
            "x": "Mar",
            "y": 296
          },
          {
            "x": "Apr",
            "y": 199
          },
          {
            "x": "May",
            "y": 204
          },
          {
            "x": "Jun",
            "y": 117
          },
          {
            "x": "Jul",
            "y": 87
          },
          {
            "x": "Aug",
            "y": 0
          },
          {
            "x": "Sep",
            "y": 0
          },
          {
            "x": "Oct",
            "y": 0
          },
          {
            "x": "Nov",
            "y": 0
          },
          {
            "x": "Dec",
            "y": 0
          }
        ]
      },
    ])
  }, [])

  return (
    <div className={cx(styles.root)}>
      <ResponsiveLine
        data={data && data}
        margin={{
          "top": 50,
          "right": 30,
          "bottom": 100,
          "left": 45
        }}
        xScale={{
          "type": "point"
        }}
        yScale={{
          "type": "linear",
          "stacked": false,
          "min": "auto",
          "max": "auto"
        }}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "2019",
          "legendOffset": 36,
          "legendPosition": "middle"
        }}
        axisLeft={{
          "orient": "left",
          "tickSize": 5,
          "tickPadding": 15,
          "tickRotation": 0,
          // "legend": "jumlah",
          // "legendOffset": -55,
          // "legendPosition": "middle"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            "anchor": "bottom-left",
            "direction": "row",
            "justify": false,
            "translateX": 0,
            "translateY": 80,
            "itemsSpacing": 0,
            "itemDirection": "left-to-right",
            "itemWidth": 80,
            "itemHeight": 20,
            "itemOpacity": 0.75,
            "symbolSize": 12,
            "symbolShape": "circle",
            "symbolBorderColor": "rgba(0, 0, 0, .5)",
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemBackground": "rgba(0, 0, 0, .03)",
                  "itemOpacity": 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default LineChart