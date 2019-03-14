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

  const socket = React.useContext(SocketContext)

  const monthlyAmount = (month, amount) => ({"x": month, "y": amount})

  let [newReports, setNewReports] = React.useState()
  let [done, setDone] = React.useState(null)
  let [mission, setMission] = React.useState(null)
  let [accomplished, setAccomplished] = React.useState(null)

  let [show, setShow] = React.useState(null)

  let [yearReports, setYearReports] = React.useState()

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

  const fetchReportYear = year => {
    fetch(`${process.env.REACT_APP_WEB_HOST}/reports/year/${year}`)
      .then(data => data.json())
      .then(reports => {
        setYearReports(reports.filter(report => report.status !== "cancelled" && report.status !== "pending"))
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
    fetchReportYear(2019)
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

  let [reportMonthData, setReportMonthData] = React.useState()

  React.useEffect(() => {
    if(reportMonthData) {
      console.log(reportMonthData)
    }
  }, [reportMonthData])

  React.useEffect(() => {
    if(yearReports) {
      let jan = monthlyAmount("Jan", yearReports.filter(report => report.monthCreated === 0).length)
      let feb = monthlyAmount("Feb", yearReports.filter(report => report.monthCreated === 1).length)
      let mar = monthlyAmount("Mar", yearReports.filter(report => report.monthCreated === 2).length)
      let apr = monthlyAmount("Apr", yearReports.filter(report => report.monthCreated === 3).length)
      let may = monthlyAmount("May", yearReports.filter(report => report.monthCreated === 4).length)
      let jun = monthlyAmount("Jun", yearReports.filter(report => report.monthCreated === 5).length)
      let jul = monthlyAmount("Jul", yearReports.filter(report => report.monthCreated === 6).length)
      let aug = monthlyAmount("Aug", yearReports.filter(report => report.monthCreated === 7).length)
      let sep = monthlyAmount("Sep", yearReports.filter(report => report.monthCreated === 8).length)
      let oct = monthlyAmount("Oct", yearReports.filter(report => report.monthCreated === 9).length)
      let nov = monthlyAmount("Nov", yearReports.filter(report => report.monthCreated === 10).length)
      let dec = monthlyAmount("Dec", yearReports.filter(report => report.monthCreated === 11).length)
      setReportMonthData([jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec])
    }
  }, [yearReports])

  let lineData = [
    {
      "id": "Reports",
      "color": "hsl(136, 70%, 50%)",
      "data": [
        {
          "x": "Jan",
          "y": 208
        },
        {
          "x": "Feb",
          "y": 123
        },
        {
          "x": "Mar",
          "y": 108
        },
        {
          "x": "Apr",
          "y": 170
        },
        {
          "x": "May",
          "y": 1
        },
        {
          "x": "Jun",
          "y": 69
        },
        {
          "x": "Jul",
          "y": 213
        },
        {
          "x": "Aug",
          "y": 0
        },
        {
          "x": "Sep",
          "y": 0
        },
        {
          "x": "Oct",
          "y": 0
        },
        {
          "x": "Nov",
          "y": 0
        },
        {
          "x": "Dec",
          "y": 0
        }
      ]
    },
    {
      "id": "Users",
      "color": "hsl(136, 70%, 50%)",
      "data": [
        {
          "x": "Jan",
          "y": 103
        },
        {
          "x": "Feb",
          "y": 23
        },
        {
          "x": "Mar",
          "y": 110
        },
        {
          "x": "Apr",
          "y": 206
        },
        {
          "x": "May",
          "y": 56
        },
        {
          "x": "Jun",
          "y": 155
        },
        {
          "x": "Jul",
          "y": 85
        },
        {
          "x": "Aug",
          "y": 0
        },
        {
          "x": "Sep",
          "y": 0
        },
        {
          "x": "Oct",
          "y": 0
        },
        {
          "x": "Nov",
          "y": 0
        },
        {
          "x": "Dec",
          "y": 0
        }
      ]
    },
    {
      "id": "Missions",
      "color": "hsl(121, 70%, 50%)",
      "data": [
        {
          "x": "Jan",
          "y": 149
        },
        {
          "x": "Feb",
          "y": 267
        },
        {
          "x": "Mar",
          "y": 296
        },
        {
          "x": "Apr",
          "y": 199
        },
        {
          "x": "May",
          "y": 204
        },
        {
          "x": "Jun",
          "y": 117
        },
        {
          "x": "Jul",
          "y": 87
        },
        {
          "x": "Aug",
          "y": 0
        },
        {
          "x": "Sep",
          "y": 0
        },
        {
          "x": "Oct",
          "y": 0
        },
        {
          "x": "Nov",
          "y": 0
        },
        {
          "x": "Dec",
          "y": 0
        }
      ]
    },
  ]

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
        <LineChart data={lineData} xAxis="March 2019"/>
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