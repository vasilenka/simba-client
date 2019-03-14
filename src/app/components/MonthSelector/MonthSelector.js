import styles from './MonthSelector.module.scss'
import React from 'react'
import cx from 'classnames'

import Option from '../Option/Option'
import Dropdown from '../Dropdown/Dropdown'

const MonthSelector = ({
  className,
  small,
  getSelectedValue,
  ...restProps
  }) => {

  let options = [
    {
      label: 'January',
      value: 0
    },
    {
      label: 'February',
      value: 1
    },
    {
      label: 'March',
      value: 2
    },
    {
      label: 'April',
      value: 3
    },
    {
      label: 'May',
      value: 4
    },
    {
      label: 'June',
      value: 5
    },
    {
      label: 'July',
      value: 6
    },
    {
      label: 'August',
      value: 7
    },
    {
      label: 'September',
      value: 8
    },
    {
      label: 'October',
      value: 9
    },
    {
      label: 'November',
      value: 10
    },
    {
      label: 'December',
      value: 11
    },
  ]

  let [selected, setSelected] = React.useState(1)

  React.useEffect(() => {
    if(selected && getSelectedValue) {
      getSelectedValue(selected)
    }
  }, [selected])

  return (
    <Dropdown
      className={cx({
        [styles.root]: true,
        [className]: className,
      })}
      setValue={value => setSelected(value)}
      value={selected}
      small={small}
      {...restProps}
      >
      { options && options.map(opt => <Option key={`${opt.value}${opt.label}`} value={opt.value} label={opt.label}/>) }
    </Dropdown>
  )
}

export default MonthSelector