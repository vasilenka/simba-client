import styles from './Navbar.module.scss'
import React from 'react'
import cx from 'classnames'
import {Link} from 'react-router-dom'
import {AuthContext} from './../context/context'
import axios from 'axios'

import NavbarBrand from '../NavbarBrand/NavbarBrand'
import NavbarSecondary from '../NavbarSecondary/NavbarSecondary'
import NavbarPrimary from '../NavbarPrimary/NavbarPrimary'
import NavbarMenu from '../NavbarMenu/NavbarMenu'
import NavbarAvatar from '../NavbarAvatar/NavbarAvatar'
import Button from '../Button/Button'

const Navbar = ({ children, className, ...restProps }) => {

  let context = React.useContext(AuthContext)

  return (
    <div
      className={cx({
        [styles.root]: true,
        [className]: className
      })}
      {...restProps}
    >
      <NavbarPrimary>
        <NavbarBrand />
        <NavbarMenu to="/summary">Summary</NavbarMenu>
        <NavbarMenu to="/reports">Reports & Missions</NavbarMenu>
        <NavbarMenu to="/broadcasts">Broadcasts</NavbarMenu>
        <NavbarMenu to="/users">Users</NavbarMenu>
        <NavbarMenu to="/requests">Requests</NavbarMenu>
      </NavbarPrimary>
      <NavbarSecondary>
        {context.token &&
          <React.Fragment>
            <Link to="/broadcasts/new" style={{marginRight: '24px'}}>
              <Button small primary>New broadcast</Button>
            </Link>
            <NavbarAvatar src={context.user.profileUrl } />
          </React.Fragment>
        }
        {context && !context.token &&
          <Link to="/auth">
            <Link to="/broadcasts/new" style={{marginRight: '24px'}}>
              <Button small primary>New broadcast</Button>
            </Link>
            <Button small primary>Sign in</Button>
          </Link>
        }
      </NavbarSecondary>
    </div>
  )
}

export default Navbar
