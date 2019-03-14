import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import styles from './App.module.scss'
import classnames from 'classnames'

import UserPage from './pages/UserPage/UserPage'
import ReportDetail from './components/ReportDetail/ReportDetail'
import ReportPage from './pages/ReportPage/ReportPage'
import RequestPage from './pages/RequestPage/RequestPage'
import UserDetail from './components/UserDetail/UserDetail';
import SummaryPage from './pages/SummaryPage/SummaryPage';

class App extends Component {
  render() {
    return (
      <div className={classnames(styles.root)}>
        <Router>
          <React.Fragment>
            <React.Fragment>
              <Route exact path="/" render={() => <Redirect to={`/reports/active`}/>}/>
              <Route path="/reports" component={ReportPage} />
              <Route exact path={`/active/:reportId`} component={ReportDetail} />
              <Route exact path={`/missions/:reportId`} component={ReportDetail} />
              <Route exact path={`/completed/:reportId`} component={ReportDetail} />
              <Route exact path="/users" component={UserPage} />
              <Route exact path="/users/:id" component={UserDetail} />
              <Route exact path="/request" component={RequestPage} />
              <Route exact path="/summary" component={SummaryPage} />
            </React.Fragment>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

export default App
