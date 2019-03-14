import styles from './Navbar.module.scss';
import React from 'react';
import cx from 'classnames';
import {NavLink} from 'react-router-dom'

// import { ReactComponent as Logo } from './mid.svg';
import dlogo from './dlogo.png'
import Text from '../Text/Text';
import Image from '../Image/Image';

const Navbar = ({ className, ...restProps }) => {
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
              <NavLink to="/users" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Users
                </Text>
              </NavLink>
            </div>
            <div className={styles.menu}>
              <NavLink to="/request" className={styles.linkContainer} activeClassName={styles.activeLinkContainer}>
                <Text heading6 className={styles.link}>
                  Request
                </Text>
              </NavLink>
            </div>
          </div>
        </div>
        <div className={styles.secondary}>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
