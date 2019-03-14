import styles from './SummaryPage.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../../components/Text/Text'
// import {NavLink, Route, Redirect} from 'react-router-dom'

import SocketContext from './../../context/SocketContext'
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../layouts/Container/Container';
// import MainContent from '../../layouts/MainContent/MainContent';
// import ReportList from '../../components/ReportList/ReportList';
import MapCluster from '../../components/MapCluster/MapCluster';
// import Button from '../../components/Button/Button';
// import RadioList from '../../components/RadioList/RadioList';
// import RadioButton from '../../components/RadioButton/RadioButton';
// import RadioMark from '../../components/RadioMark/RadioMark';
// import RadioLabel from '../../components/RadioLabel/RadioLabel';
import MapSummary from '../../components/MapSummary/MapSummary';
import LineChart from '../../components/LineChart/LineChart';
import BarChart from '../../components/BarChart/BarChart';
import PieChart from '../../components/PieChart/PieChart';
// import LineAltChart from '../../components/LineAltChart/LineAltChart';

const SummaryPage = ({
  className,
  active,
  match,
  history,
  ...restProps,
  }) => {

  const [newReports, setNewReports] = React.useState()
  const socket = React.useContext(SocketContext)

  let [done, setDone] = React.useState(null)
  let [mission, setMission] = React.useState(null)
  let [accomplished, setAccomplished] = React.useState(null)

  let [show, setShow] = React.useState(null)

  const fetchReport = () => {
    fetch(`${process.env.REACT_APP_WEB_HOST}/reports`)
      .then(data => data.json())
      .then(reports => {

        let done = reports.filter(report => report.status === 'active')
        let mission = reports.filter(report => report.status === 'mission')
        let accomplished = reports.filter(report => report.status === 'accomplished')

        setDone(done)
        setMission(mission)
        setAccomplished(accomplished)
      })
      .catch(err => console.log('ERR: ', err))
  }

  React.useEffect(() => {
    if(done && !show) {
      setShow(done)
    }
  }, [done])

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
        <div className={cx(styles.root)}>
          <Text heading1 component="h1" className={styles.pageHeading}>
            Summary
          </Text>
        </div>
      </Container>
      <Container>
        {show &&
          <div>
            <MapSummary done={done} mission={mission} accomplished={accomplished} setShow={setShow}/>
            <br/>
            <MapCluster match={match} markers={show} />
          </div>}
      </Container>
      <br/>
      <br/>
      <Container narrow className={styles.mainContainer}>
        <div className={cx(styles.root)}>
          <Text heading2 component="h2" className={styles.subheading}>
            Reports and Users Growth
          </Text>
          <Text medium component="p" style={{maxWidth: '560px'}}>
            Understand where your members have conversations, and where messages are most commonly read. Most messages will have multiple readers.
          </Text>
        </div>
      </Container>
      <Container>
        <LineChart />
      </Container>
      <Container narrow className={styles.mainContainer}>
        <div className={cx(styles.root)}>
          <Text heading2 component="h2" className={styles.subheading}>
            Reports Conversion
          </Text>
          <Text medium component="p" style={{maxWidth: '560px'}}>
            Learn how information is shared in your workspace.
          </Text>
        </div>
      </Container>
      <Container>
        <BarChart />
      </Container>
      <Container narrow className={styles.mainContainer}>
        <div className={cx(styles.root)}>
          <Text heading2 component="h2" className={styles.subheading}>
            Users Distribution
          </Text>
          <Text medium component="p" style={{maxWidth: '560px'}}>
            Understand where your members have conversations, and where messages are most commonly read. Most messages will have multiple readers.
          </Text>
        </div>
      </Container>
      <Container narrow>
        <PieChart />
      </Container>
    </React.Fragment>
  )
}

export default SummaryPage