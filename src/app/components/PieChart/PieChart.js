import styles from './PieChart.module.scss'
import React from 'react'
import cx from 'classnames'

import { ResponsivePie } from '@nivo/pie'

const PieChart = ({
  className,
  data,
  small,
  ...restProps
  }) => {

  return (
    <div
      className={cx({
        [styles.root]: true,
        [styles.large]: !small,
        [styles.small]: small,
      })}>
      {data &&
        <ResponsivePie
        data={data}
        margin={ small
        ? {
            "top": 0,
            "right": 80,
            "bottom": 0,
            "left": 80
          }
        : {
            "top": 40,
            "right": 80,
            "bottom": 80,
            "left": 80
          }
        }
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors="nivo"
        colorBy="id"
        borderWidth={1}
        borderColor="inherit:darker(0.2)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            "id": "dots",
            "type": "patternDots",
            "background": "inherit",
            "color": "rgba(255, 255, 255, 0.3)",
            "size": 4,
            "padding": 1,
            "stagger": true
          },
          {
            "id": "lines",
            "type": "patternLines",
            "background": "inherit",
            "color": "rgba(255, 255, 255, 0.3)",
            "rotation": -45,
            "lineWidth": 6,
            "spacing": 10
          }
        ]}
        fill={[
          {
            "match": {
              "id": "reporter"
            },
            "id": "dots"
          },
          {
            "match": {
              "id": "fireman"
            },
            "id": "lines"
          },
          {
            "match": {
              "id": "admin"
            },
            "id": "lines"
          },
          {
            "match": {
              "id": "volunteer"
            },
            "id": "dots"
          },
          {
            "match": {
              "id": "scala"
            },
            "id": "lines"
          },
          {
            "match": {
              "id": "lisp"
            },
            "id": "lines"
          },
          {
            "match": {
              "id": "elixir"
            },
            "id": "lines"
          },
          {
            "match": {
              "id": "javascript"
            },
            "id": "lines"
          }
        ]}
        legends={small ? [] : [
          {
            "anchor": "bottom",
            "direction": "row",
            "translateY": 56,
            "itemWidth": 100,
            "itemHeight": 18,
            "itemTextColor": "#999",
            "symbolSize": 18,
            "symbolShape": "circle",
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemTextColor": "#000"
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

export default PieChart