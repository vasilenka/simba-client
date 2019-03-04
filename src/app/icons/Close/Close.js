import styles from './Close.module.scss'
import React from 'react'
import cx from 'classnames'

import {ReactComponent as CloseIcon} from './close.svg'

const Close = ({className, small, medium, large, ...restProps}) =>
  <CloseIcon
    className={cx({
      [styles.root]: true,
      [styles.small]: small,
      [styles.large]: large,
      [styles.medium]: medium || (!small && !large),
      [className]: className
      })}
    {...restProps}

    />

export default Close