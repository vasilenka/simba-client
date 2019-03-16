import styles from './ReportPage.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../../components/Text/Text'
import {NavLink, Route, Redirect} from 'react-router-dom'

import SocketContext from './../../context/SocketContext'
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../layouts/Container/Container';
import MainContent from '../../layouts/MainContent/MainContent';
import ReportList from '../../components/ReportList/ReportList';

const ReportPage = ({
  className,
  active,
  match,
  ...restProps,
  }) => {

  const [newReports, setNewReports] = React.useState()
  const socket = React.useContext(SocketContext)

  let [done, setDone] = React.useState(null)
  let [mission, setMission] = React.useState(null)
  let [accomplished, setAccomplished] = React.useState(null)

  const fetchReport = () => {
    fetch(`${process.env.REACT_APP_WEB_HOST}/reports`)
      .then(data => data.json())
      .then(reports => {

        let done = reports.filter(report => report.status === 'active' && report.reporter)
        let mission = reports.filter(report => report.status === 'mission' && report.reporter)
        let accomplished = reports.filter(report => report.status === 'accomplished' && report.reporter)

        setDone(done)
        setMission(mission)
        setAccomplished(accomplished)
      })
      .catch(err => console.log('ERR: ', err))
  }

  React.useEffect(() => {
    fetchReport()
    socket.on('new_report', (report) => {
      setNewReports(report)
    })
    return function cleanup() {
      socket.on('new_report', (report) => {
        setNewReports(report)
      })
    }
  }, [])

  React.useEffect(() => {
    if(newReports) {
      fetchReport()
    }
  }, [newReports])

  return (
    <React.Fragment>
      <Navbar />
      <Container narrow className={styles.mainContainer}>
        <MainContent>
          <div styles={cx(styles.root)}>
            <Text heading1 component="h1" className={styles.pageHeading}>
              Reports & Missions
            </Text>
            <div className={styles.navTabContainer}>
              <NavLink to={`${match.url}/active`} className={styles.navtab} activeClassName={styles.activeNavTab}>
                <Text heading5>Active</Text>
              </NavLink>
              <NavLink to={`${match.url}/missions`} className={styles.navtab} activeClassName={styles.activeNavTab}>
                <Text heading5>Missions</Text>
              </NavLink>
              <NavLink to={`${match.url}/completed`} className={styles.navtab} activeClassName={styles.activeNavTab}>
                <Text heading5>Accomplished</Text>
              </NavLink>
            </div>
            <div className={styles.panels}>
              <Route exact path={`${match.path}`} render={() => <Redirect to={`${match.path}/active`}/>}/>
              <Route exact path={`${match.path}/active`} render={props => <ReportList {...props} type="active" reports={done} />}/>
              <Route exact path={`${match.path}/missions`} render={props => <ReportList {...props} type="missions" reports={mission} />}/>
              <Route exact path={`${match.path}/completed`} render={props => <ReportList {...props} type="completed" reports={accomplished} />}/>
            </div>
          </div>
        </MainContent>
      </Container>
    </React.Fragment>
  )
}

export default ReportPage