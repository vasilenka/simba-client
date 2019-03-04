import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styles from './App.module.scss'
import classnames from 'classnames'

import Homepage from './pages/Homepage/Homepage'
import UserPage from './pages/UserPage/UserPage'
import ReportDetail from './components/ReportDetail/ReportDetail'
import ReportPage from './pages/ReportPage/ReportPage'
import RequestPage from './pages/RequestPage/RequestPage'

class App extends Component {
  render() {
    return (
      <div className={classnames(styles.root)}>
        <Router>
          <React.Fragment>
            <React.Fragment>
              <Route exact path="/" component={Homepage} />
              <Route path="/reports" component={ReportPage} />
              <Route exact path={`/active/:reportId`} component={ReportDetail} />
              <Route exact path={`/missions/:reportId`} component={ReportDetail} />
              <Route exact path={`/completed/:reportId`} component={ReportDetail} />
              <Route exact path="/users" component={UserPage} />
              <Route exact path="/request" component={RequestPage} />
            </React.Fragment>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

export default App
