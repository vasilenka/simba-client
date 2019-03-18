import styles from './Navbar.module.scss'
import React from 'react'
import cx from 'classnames'
import {NavLink, Link} from 'react-router-dom'

import {AuthContext} from '../context/context'

import dlogo from './dlogo.png'
import Text from '../Text/Text'
import Image from '../Image/Image'
import Button from '../Button/Button'

const Navbar = ({ className, ...restProps }) => {

  const authenticated = React.useContext(AuthContext)

  return (
    <div className={cx(styles.root)}>
      <div className={cx(styles.container)}>
        <div className={styles.primary}>
          <div className={styles.brand}>
            <NavLink exact to="/">
              {/* <Logo className={styles.logo} /> */}
              <Image src={dlogo} naturalWidth={1153 } alt="darurat! app" naturalHeight={320} containerClass={styles.logo}/>
            </NavLink>
          </div>
          <div className={cx(styles.menus)}>
            <div className={styles.menu}>
              <NavLink to="/summary" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Summary
                </Text>
              </NavLink>
            </div>
            <div className={styles.menu}>
              <NavLink to="/reports" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Reports & Missions
                </Text>
              </NavLink>
            </div>
            <div className={styles.menu}>
              <NavLink to="/broadcast" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Broadcasts
                </Text>
              </NavLink>
            </div>
            <div className={styles.menu}>
              <NavLink to="/users" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Users
                </Text>
              </NavLink>
            </div>
            <div className={styles.menu}>
              <NavLink to="/request" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Requests
                </Text>
              </NavLink>
            </div>
          </div>
        </div>
        <div className={styles.secondary}>
          {authenticated && authenticated.role === 'dispatcher' &&
            <Link to="/broadcast/new" style={{marginRight: '12px'}}>
              <Button small primary>New broadcast</Button>
            </Link>
          }
          <Link to="/auth">
            <Button small primaryAlt>Sign in</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
