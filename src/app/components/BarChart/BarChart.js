import styles from './BarChart.module.scss'
import React from 'react'
import cx from 'classnames'

import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({
  className,
  ...restProps
  }) => {

  let [data, setData] = React.useState()

  React.useEffect(() => {
    setData([
      {
        "date": "1",
        "reports": 12,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(173, 70%, 50%)",
        "invalid": 64,
        "invalidColor": "hsl(42, 70%, 50%)",
      },
      {
        "date": "2",
        "reports": 142,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 5,
        "missionsColor": "hsl(340, 70%, 50%)",
        "invalid": 109,
        "invalidColor": "hsl(0, 70%, 50%)",
      },
      {
        "date": "3",
        "reports": 85,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 136,
        "missionsColor": "hsl(209, 70%, 50%)",
        "invalid": 69,
        "invalidColor": "hsl(221, 70%, 50%)",
      },
      {
        "date": "4",
        "reports": 100,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 196,
        "missionsColor": "hsl(322, 70%, 50%)",
        "invalid": 112,
        "invalidColor": "hsl(118, 70%, 50%)",
      },
      {
        "date": "5",
        "reports": 1,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 89,
        "missionsColor": "hsl(332, 70%, 50%)",
        "invalid": 47,
        "invalidColor": "hsl(282, 70%, 50%)",
      },
      {
        "date": "6",
        "reports": 136,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(71, 70%, 50%)",
        "invalid": 94,
        "invalidColor": "hsl(135, 70%, 50%)",
      },
      {
        "date": "7",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      },
      {
        "date": "8",
        "reports": 12,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(173, 70%, 50%)",
        "invalid": 64,
        "invalidColor": "hsl(42, 70%, 50%)",
      },
      {
        "date": "9",
        "reports": 142,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 5,
        "missionsColor": "hsl(340, 70%, 50%)",
        "invalid": 109,
        "invalidColor": "hsl(0, 70%, 50%)",
      },
      {
        "date": "10",
        "reports": 85,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 136,
        "missionsColor": "hsl(209, 70%, 50%)",
        "invalid": 69,
        "invalidColor": "hsl(221, 70%, 50%)",
      },
      {
        "date": "11",
        "reports": 100,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 196,
        "missionsColor": "hsl(322, 70%, 50%)",
        "invalid": 112,
        "invalidColor": "hsl(118, 70%, 50%)",
      },
      {
        "date": "12",
        "reports": 1,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 89,
        "missionsColor": "hsl(332, 70%, 50%)",
        "invalid": 47,
        "invalidColor": "hsl(282, 70%, 50%)",
      },
      {
        "date": "13",
        "reports": 136,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(71, 70%, 50%)",
        "invalid": 94,
        "invalidColor": "hsl(135, 70%, 50%)",
      },
      {
        "date": "14",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      },
      {
        "date": "15",
        "reports": 12,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(173, 70%, 50%)",
        "invalid": 64,
        "invalidColor": "hsl(42, 70%, 50%)",
      },
      {
        "date": "16",
        "reports": 142,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 5,
        "missionsColor": "hsl(340, 70%, 50%)",
        "invalid": 109,
        "invalidColor": "hsl(0, 70%, 50%)",
      },
      {
        "date": "17",
        "reports": 85,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 136,
        "missionsColor": "hsl(209, 70%, 50%)",
        "invalid": 69,
        "invalidColor": "hsl(221, 70%, 50%)",
      },
      {
        "date": "18",
        "reports": 100,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 196,
        "missionsColor": "hsl(322, 70%, 50%)",
        "invalid": 112,
        "invalidColor": "hsl(118, 70%, 50%)",
      },
      {
        "date": "19",
        "reports": 1,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 89,
        "missionsColor": "hsl(332, 70%, 50%)",
        "invalid": 47,
        "invalidColor": "hsl(282, 70%, 50%)",
      },
      {
        "date": "20",
        "reports": 136,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(71, 70%, 50%)",
        "invalid": 94,
        "invalidColor": "hsl(135, 70%, 50%)",
      },
      {
        "date": "21",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      },
      {
        "date": "22",
        "reports": 12,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(173, 70%, 50%)",
        "invalid": 64,
        "invalidColor": "hsl(42, 70%, 50%)",
      },
      {
        "date": "23",
        "reports": 142,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 5,
        "missionsColor": "hsl(340, 70%, 50%)",
        "invalid": 109,
        "invalidColor": "hsl(0, 70%, 50%)",
      },
      {
        "date": "24",
        "reports": 85,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 136,
        "missionsColor": "hsl(209, 70%, 50%)",
        "invalid": 69,
        "invalidColor": "hsl(221, 70%, 50%)",
      },
      {
        "date": "25",
        "reports": 100,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 196,
        "missionsColor": "hsl(322, 70%, 50%)",
        "invalid": 112,
        "invalidColor": "hsl(118, 70%, 50%)",
      },
      {
        "date": "26",
        "reports": 1,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 89,
        "missionsColor": "hsl(332, 70%, 50%)",
        "invalid": 47,
        "invalidColor": "hsl(282, 70%, 50%)",
      },
      {
        "date": "27",
        "reports": 136,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 28,
        "missionsColor": "hsl(71, 70%, 50%)",
        "invalid": 94,
        "invalidColor": "hsl(135, 70%, 50%)",
      },
      {
        "date": "28",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      },
      {
        "date": "29",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      },
      {
        "date": "30",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      },
      {
        "date": "31",
        "reports": 23,
        "reportsColor": "hsl(210, 70%, 50%)",
        "missions": 16,
        "missionsColor": "hsl(154, 70%, 50%)",
        "invalid": 65,
        "invalidColor": "hsl(180, 70%, 50%)",
      }
    ])
  }, [])

  return (
    <div className={cx(styles.root)}>
    {data &&
      <ResponsiveBar
        data={data}
        keys={[
          "reports",
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
          "legend": "date",
          "legendPosition": "middle",
          "legendOffset": 32
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