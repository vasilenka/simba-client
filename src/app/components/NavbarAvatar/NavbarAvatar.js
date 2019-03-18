import styles from './NavbarAvatar.module.scss'
import React from 'react'
import cx from 'classnames'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import Image from '../Image/Image'
import Popout from './../Popout/Popout'
// import Divider from '../../docs/Divider/Divider'
import Text from '../Text/Text'
import { AuthContext } from '../context/context';

const Content = ({ setVisible, visible }) => {

  let context = React.useContext(AuthContext)

  const processLogout = () => {
    axios.post(`${process.env.REACT_APP_WEB_HOST}/auth/logout`, {}, { headers: {'Authorization': `Bearer ${context.token}`}})
      .then(res => {
        if(res.status === 500) {
          return Promise.reject()
        }
        context.setToken("")
        context.setUser("")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ul className={styles.menuContainer}>
      {/* <Link
        to="/profile"
        className={styles.link}
        onClick={() => setVisible(!visible)}
      >
        <li className={styles.menu}>
          <Text small className={styles.menuText}>
            Profile
          </Text>
        </li>
      </Link>
      <div className={styles.link}>
        <Divider className={styles.divider} small />
      </div> */}
      <button
        to="/logout"
        className={styles.link}
        onClick={() => {
          processLogout()
          setVisible(!visible)
        }}
      >
        <li className={styles.menu}>
          <Text small className={styles.menuText}>
            Sign out
          </Text>
        </li>
      </button>
    </ul>
  )
  }

const NavbarAvatar = ({ children, src, className, ...restProps }) => {
  return (
    <Popout
      withArrow={false}
      bottomRight
      content={(setVisible, visible) => (
        <Content setVisible={setVisible} visible={visible} />
      )}
      containerClassName={styles.popout}
      contentClassName={styles.content}
    >
      {(setVisible, visible) => (
        <div
          onClick={() => setVisible(!visible)}
          className={cx({
            [styles.root]: true,
            [className]: className
          })}
          {...restProps}
        >
          <div className={styles.container}>
            <Image src={src || process.env.REACT_APP_DEFAULT_IMAGE } fit="cover" className={styles.picture} />
          </div>
        </div>
      )}
    </Popout>
  )
}

export default NavbarAvatar
