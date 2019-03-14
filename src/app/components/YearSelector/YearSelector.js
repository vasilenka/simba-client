import styles from './YearSelector.module.scss'
import React from 'react'
import cx from 'classnames'

import dayjs from 'dayjs'
import Text from '../Text/Text';
import Button from '../Button/Button';

const YearSelector = ({
  className,
  getSelectedValue,
  ...restProps
  }) => {

  let [year, setYear] = React.useState(dayjs(Date.now()).format('YYYY'))

  React.useEffect(() => {
    if(year) {
      // console.log(year)
    }
  }, [year])

  return (
    <div className={cx(styles.root)}>
      <Button
        small
        secondary
        disabled={year <= 2019}
        onClick={() => setYear(Number(year) - 1)}
        >
        Prev
      </Button>
      { year && <Text heading3 component="h2" style={{ minWidth: '96px', textAlign: 'center' }}>{ year }</Text> }
      <Button
        small
        secondary
        onClick={() => setYear(Number(year) + 1)}
        >
        Next
      </Button>
    </div>
  )
}

export default YearSelector