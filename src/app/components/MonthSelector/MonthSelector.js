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
      value: 1
    },
    {
      label: 'February',
      value: 2
    },
    {
      label: 'March',
      value: 3
    },
    {
      label: 'April',
      value: 4
    },
    {
      label: 'May',
      value: 5
    },
    {
      label: 'June',
      value: 6
    },
    {
      label: 'July',
      value: 6
    },
    {
      label: 'August',
      value: 8
    },
    {
      label: 'September',
      value: 9
    },
    {
      label: 'October',
      value: 10
    },
    {
      label: 'November',
      value: 11
    },
    {
      label: 'December',
      value: 12
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