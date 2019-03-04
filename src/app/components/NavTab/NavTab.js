import styles from './NavTab.module.scss';
import React from 'react';
import cx from 'classnames';
import {NavLink} from 'react-router-dom'

const NavTab = ({
  activeClassName,
  to,
  className,
  ...restProps
  }) => {
  return (
    <NavLink
      to={to}
      activeClassName={activeClassName}
      className={cx({
        [styles.root]: true,
        [className]: [className]
      })}>
      {children}
    </NavLink>
  )
}

export default NavTab