import styles from './LineAltChart.module.scss'
import React from 'react'
import cx from 'classnames'

import {Line} from 'react-chartjs-2'

const LineAltChart = ({
  className,
  ...restProps
  }) => {

  const chartRef = React.useRef()

  React.useEffect(() => {
    if(chartRef.current) {
      console.log(chartRef.current)
    }
  }, [chartRef])

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 88, 12, 22, 40, 64]
      }
    ]
  }

  return (
    <div className={cx(styles.root)}>
      <div className={styles.container}>
        <Line
          ref={chartRef}
          data={data}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
          />
      </div>
    </div>
  )
}

export default LineAltChart