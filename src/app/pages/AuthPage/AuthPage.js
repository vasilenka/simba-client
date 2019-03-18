import styles from './AuthPage.module.scss'
import React from 'react'
import cx from 'classnames'
import axios from 'axios'
import {AuthContext} from './../../components/context/context'

import Container from '../../layouts/Container/Container'
import Navbar from '../../components/Navbar/Navbar'
import Text from '../../components/Text/Text'
import MainContent from '../../layouts/MainContent/MainContent';
import Textfield from '../../components/Textfield/Textfield';
import Button from '../../components/Button/Button';
// import Button from '../../components/Button/Button'
// import FieldInput from '../../components/FieldInput/FieldInput'
// import PreviewBroadcast from '../../broadcast/PreviewBroadcast/PreviewBroadcast';
// import Luna from '../../components/Luna/Luna';
// import Image from '../../components/Image/Image';

const AuthPage = ({
  className,
  history,
  ...restProps
  }) => {

  let context = React.useContext(AuthContext)

  let [loading, setLoading] = React.useState(false)
  let [email, setEmail] = React.useState()
  let [password, setPassword] = React.useState()
  let [error, setError] = React.useState()

  const processLogin = () => {
    if(email && password) {
      setLoading(true)
      axios
        .post(`${process.env.REACT_APP_WEB_HOST}/auth`, { email, password })
        .then(res => {
          if(res.status === 400) {
            setError(true)
            return Promise.reject()
          }
          return res.data
        })
        .then(data => {
          context.setToken(data.token)
          context.setUser(data.user)
          setLoading(false)
          if(history.length <= 2) {
            history.push('/')
          } else {
            history.goBack()
          }
        })
        .catch(err => {
          setError(true)
          setLoading(false)
        })
    }
  }

  return (
    <React.Fragment>
      <Navbar/>
      <Container fixLeft fixRight className={cx(styles.root)}>
        <MainContent>
          <Text heading1 component="h1" className={styles.pageTitle}>Sign in</Text>
          {error && <Text heading4 component="p" style={{color: "#ff5a5b"}}>error gan!</Text>}
          <Textfield
            autoComplete="off"
            className={styles.textfield}
            label="Email"
            type="email"
            placeholder="Your email address"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e, value, type, tone) => {
              setError(false)
              setEmail(value)
              }}
          />
          <Textfield
            autoComplete="off"
            className={styles.textfield}
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            required
            value={password}
            passwordLength={6}
            onChange={(e, value, type, tone) => {
              setError(false)
              setPassword(value)
              }}
          />
          <Button primary disabled={!email || !password || loading} onClick={processLogin}>Sign in</Button>
        </MainContent>
      </Container>
    </React.Fragment>
  )
}

export default AuthPage