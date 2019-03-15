import styles from './Navbar.module.scss';
import React from 'react';
import cx from 'classnames';
import {NavLink} from 'react-router-dom'
import axios from 'axios'

// import { ReactComponent as Logo } from './mid.svg';
import dlogo from './dlogo.png'
import Text from '../Text/Text';
import Image from '../Image/Image';
import Button from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import Container from '../../layouts/Container/Container';
import Textfield from '../Textfield/Textfield';
import Luna from '../Luna/Luna';
import SinglePreview from '../SinglePreview/SinglePreview';
import FieldInput from '../FieldInput/FieldInput';

const Navbar = ({ className, ...restProps }) => {

  const postBroadcast = (title, body) => {
    axios.post(`${process.env.REACT_APP_WEB_HOST}/broadcast`,
      {
        title: title,
        body: body
      }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  let [showDialog, setShowDialog] = React.useState()

  let [title, setTitle] = React.useState("")
  let [body, setBody] = React.useState("")

  const sendBroadcast = () => {
    if(title && body) {
      postBroadcast(title, body)
    }
  }

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
          <Button small primary onClick={() => setShowDialog(true)}>New broadcast</Button>
          {showDialog &&
            <Dialog>
              <Container narrow className={styles.broadcastView}>
                <div style={{maxWidth: '560px'}}>
                  <Button secondary small onClick={() => setShowDialog(false)} style={{marginBottom: '64px'}}>Close X</Button>
                  <Text heading2 component="h1">New broadcast message</Text>
                  <br/>
                  <Text heading6 component="label" style={{display: 'block', marginBottom: '12px'}}>Judul broadcast</Text>
                  <FieldInput
                    id="title"
                    name="title"
                    value={title}
                    setValue={v => setTitle(v)}
                    />
                  <br/>
                  <Text heading6 component="label" style={{display: 'block', marginBottom: '12px'}}>Judul broadcast</Text>
                  <FieldInput
                    id="body"
                    name="body"
                    value={body}
                    setValue={v => setBody(v)}
                    />
                  <br/>
                  <br/>
                </div>
                <Button primary small onClick={sendBroadcast}>Send broadcast message</Button>
              </Container>
            </Dialog>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
