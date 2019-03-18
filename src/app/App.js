import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import styles from './App.module.scss'
import classnames from 'classnames'
import {AuthContext} from './components/context/context'
import createPersistedState from 'use-persisted-state'
import axios from 'axios'

import UserPage from './pages/UserPage/UserPage'
import ReportDetail from './components/ReportDetail/ReportDetail'
import ReportPage from './pages/ReportPage/ReportPage'
import RequestPage from './pages/RequestPage/RequestPage'
import UserDetail from './components/UserDetail/UserDetail'
import SummaryPage from './pages/SummaryPage/SummaryPage'
import BroadcastPage from './pages/BroadcastPage/BroadcastPage'
import BroadcastCreatePage from './pages/BroadcastCreatePage/BroadcastCreatePage'
import AuthPage from './pages/AuthPage/AuthPage'

const useTokenState = createPersistedState('token')
const useUserState = createPersistedState('user')

const App = (props) => {

  let [token, setToken] = useTokenState("")
  let [user, setUser] = useUserState("")

  const authUser = () => {
    axios.post(`${process.env.REACT_APP_WEB_HOST}/auth/me`, {}, { headers: {'Authorization': `Bearer ${token}`}})
      .then(res => {
        // console.log("RES: ", res)
        if(res.status === 401) {
          setToken("")
          setUser("")
        }
        return res.data
      })
      .then(data => {
        // console.log("DATA: ", data)
        setToken(data.token)
        setUser(data.user)
      })
      .catch(err => {
        // console.log("ERROR: ", err)
        setToken("")
        setUser("")
      })
  }

  React.useEffect(() => {
    authUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken}}>
      <div className={classnames(styles.root)}>
        <Router>
          <React.Fragment>
            <React.Fragment>
              <Route exact path="/" render={() => <Redirect to={`/summary`}/>}/>
              <Route exact path="/summary" component={SummaryPage} />
              <Route path="/reports" component={ReportPage} />
              <Route exact path={`/active/:reportId`} component={ReportDetail} />
              <Route exact path={`/missions/:reportId`} component={ReportDetail} />
              <Route exact path={`/completed/:reportId`} component={ReportDetail} />
              <Route exact path="/users" component={UserPage} />
              <Route exact path="/users/:id" component={UserDetail} />
              <Route exact path="/requests" component={RequestPage} />
              <Route exact path="/broadcasts" component={BroadcastPage} />
              <Route exact path="/broadcasts/new" component={BroadcastCreatePage} />

              <Route exact path="/auth" component={AuthPage} />

            </React.Fragment>
          </React.Fragment>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}

export default App
