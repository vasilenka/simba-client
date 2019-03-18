import styles from './NavbarBrand.module.scss'
import React from 'react'
import cx from 'classnames'
import {NavLink} from 'react-router-dom'

import dlogo from './logo/dlogo.png'
import Image from '../Image/Image';

const NavbarBrand = ({ children, className, ...restProps }) => {
  return (
    <div
      className={cx({
        [styles.root]: true,
        [className]: className
      })}
      {...restProps}
      >
      <NavLink exact to="/">
        <Image src={dlogo} naturalWidth={1153 } alt="darurat! app" naturalHeight={320} containerClass={styles.brand}/>
      </NavLink>
    </div>
  )
}

export default NavbarBrand
