import styles from './SummaryPage.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../../components/Text/Text'

import SocketContext from './../../context/SocketContext'
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../layouts/Container/Container';
import MapCluster from '../../components/MapCluster/MapCluster';
import MapSummary from '../../components/MapSummary/MapSummary';
import LineChart from '../../components/LineChart/LineChart';
import BarChart from '../../components/BarChart/BarChart';
import PieChart from '../../components/PieChart/PieChart';

import {generateReport, generateUser, generateYearData, generateMonthlyData} from './helper'
import {fetchReports, fetchReportsYear, fetchUsers, fetchUsersYear} from './fetchHelper'

const SummaryPage = ({
  className,
  active,
  match,
  history,
  ...restProps,
  }) => {

  const socket = React.useContext(SocketContext)

  let [newReports, setNewReports] = React.useState()
  let [done, setDone] = React.useState(null)
  let [mission, setMission] = React.useState(null)
  let [accomplished, setAccomplished] = React.useState(null)
  let [invalid, setInvalid] = React.useState(null)

  let [show, setShow] = React.useState(null)

  React.useEffect(() => {
    if(done && !show) {
      setShow(done)
    }
  }, [done])

  let [selectedYear, setSelectedYear] = React.useState(2019)
  let [yearReports, setYearReports] = React.useState()
  let [yearUsers, setYearUsers] = React.useState()
  let [allUsers, setAllUsers] = React.useState()

  React.useEffect(() => {
    fetchReports(setDone, setMission, setAccomplished, setInvalid)
    fetchUsers(setAllUsers)
    fetchReportsYear(selectedYear, setYearReports)
    fetchUsersYear(selectedYear, setYearUsers)
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
      fetchReports(setDone, setMission, setAccomplished, setInvalid)
    }
  }, [newReports])

  let [chartData, setChartData] = React.useState([
    { "id": "New Reports", "data": [] },
    { "id": "New Users", "data": [] }
  ])

  let [reportYearData, setReportYearData] = React.useState([])
  let [userYearData, setUserYearData] = React.useState([])

  let [reportMarchData, setReportMarchData] = React.useState([])
  let [userMarchData, setUserMarchData] = React.useState([])

  React.useEffect(() => {
    let chartSchema = [...chartData]
    chartSchema[0].data = reportMarchData ? reportMarchData : []
    chartSchema[1].data = userMarchData ? userMarchData : []
    setChartData(chartSchema)
  }, [reportMarchData, userMarchData])

  let [jan, setJan] = React.useState()
  let [janUsers, setJanUsers] = React.useState()
  let [janData, setJanData] = React.useState()
  let [janUsersData, setJanUsersData] = React.useState()
  React.useEffect(() => {
    if(jan) {
      generateReport(selectedYear, jan, 1, setJanData)
    }
  }, [jan, selectedYear])
  React.useEffect(() => {
    if(janUsers) {
      generateUser(selectedYear, janUsers, 1, setJanUsersData)
    }
  }, [janUsers, selectedYear])

  let [feb, setFeb] = React.useState()
  let [febUsers, setFebUsers] = React.useState()
  let [febData, setFebData] = React.useState()
  let [febUsersData, setFebUsersData] = React.useState()
  React.useEffect(() => {
    if(feb) {
      generateReport(selectedYear, feb, 2, setFebData)
    }
  }, [feb, selectedYear])
  React.useEffect(() => {
    if(febUsers) {
      generateUser(selectedYear, febUsers, 2, setFebUsersData)
    }
  }, [febUsers, selectedYear])

  let [mar, setMar] = React.useState()
  let [marUsers, setMarUsers] = React.useState()
  let [marData, setMarData] = React.useState()
  let [marUsersData, setMarUsersData] = React.useState()
  React.useEffect(() => {
    if(mar) {
      generateReport(selectedYear, mar, 3, setMarData)
    }
  }, [mar, selectedYear])
  React.useEffect(() => {
    if(marUsers) {
      generateUser(selectedYear, marUsers, 3, setMarUsersData)
    }
  }, [marUsers, selectedYear])

  let [apr, setApr] = React.useState()
  let [aprUsers, setAprUsers] = React.useState()
  let [aprData, setAprData] = React.useState()
  let [aprUsersData, setAprUsersData] = React.useState()
  React.useEffect(() => {
    if(apr) {
      generateReport(selectedYear, apr, 4, setAprData)
    }
  }, [apr, selectedYear])
  React.useEffect(() => {
    if(aprUsers) {
      generateUser(selectedYear, aprUsers, 4, setAprUsersData)
    }
  }, [aprUsers, selectedYear])

  let [may, setMay] = React.useState()
  let [mayUsers, setMayUsers] = React.useState()
  let [mayData, setMayData] = React.useState()
  let [mayUsersData, setMayUsersData] = React.useState()
  React.useEffect(() => {
    if(may) {
      generateReport(selectedYear, may, 5, setMayData)
    }
  }, [may, selectedYear])
  React.useEffect(() => {
    if(mayUsers) {
      generateUser(selectedYear, mayUsers, 5, setMayUsersData)
    }
  }, [mayUsers, selectedYear])

  let [jun, setJun] = React.useState()
  let [junUsers, setJunUsers] = React.useState()
  let [junData, setJunData] = React.useState()
  let [junUsersData, setJunUsersData] = React.useState()
  React.useEffect(() => {
    if(jun) {
      generateReport(selectedYear, jun, 6, setJunData)
    }
  }, [jun, selectedYear])
  React.useEffect(() => {
    if(junUsers) {
      generateUser(selectedYear, junUsers, 6, setJunUsersData)
    }
  }, [junUsers, selectedYear])

  let [jul, setJul] = React.useState()
  let [julUsers, setJulUsers] = React.useState()
  let [julData, setJulData] = React.useState()
  let [julUsersData, setJulUsersData] = React.useState()
  React.useEffect(() => {
    if(jul) {
      generateReport(selectedYear, jul, 7, setJulData)
    }
  }, [jul, selectedYear])
  React.useEffect(() => {
    if(julUsers) {
      generateUser(selectedYear, julUsers, 7, setJulUsersData)
    }
  }, [julUsers, selectedYear])

  let [aug, setAug] = React.useState()
  let [augUsers, setAugUsers] = React.useState()
  let [augData, setAugData] = React.useState()
  let [augUsersData, setAugUsersData] = React.useState()
  React.useEffect(() => {
    if(aug) {
      generateReport(selectedYear, aug, 8, setAugData)
    }
  }, [aug, selectedYear])
  React.useEffect(() => {
    if(augUsers) {
      generateUser(selectedYear, augUsers, 8, setAugUsersData)
    }
  }, [augUsers, selectedYear])

  let [sep, setSep] = React.useState()
  let [sepUsers, setSepUsers] = React.useState()
  let [sepData, setSepData] = React.useState()
  let [sepUsersData, setSepUsersData] = React.useState()
  React.useEffect(() => {
    if(sep) {
      generateReport(selectedYear, sep, 9, setSepData)
    }
  }, [sep, selectedYear])
  React.useEffect(() => {
    if(sepUsers) {
      generateUser(selectedYear, sepUsers, 9, setSepUsersData)
    }
  }, [sepUsers, selectedYear])

  let [oct, setOct] = React.useState()
  let [octUsers, setOctUsers] = React.useState()
  let [octData, setOctData] = React.useState()
  let [octUsersData, setOctUsersData] = React.useState()
  React.useEffect(() => {
    if(oct) {
      generateReport(selectedYear, oct, 10, setOctData)
    }
  }, [oct, selectedYear])
  React.useEffect(() => {
    if(octUsers) {
      generateUser(selectedYear, octUsers, 10, setOctUsersData)
    }
  }, [octUsers, selectedYear])

  let [nov, setNov] = React.useState()
  let [novUsers, setNovUsers] = React.useState()
  let [novData, setNovData] = React.useState()
  let [novUsersData, setNovUsersData] = React.useState()
  React.useEffect(() => {
    if(nov) {
      generateReport(selectedYear, nov, 11, setNovData)
    }
  }, [nov, selectedYear])
  React.useEffect(() => {
    if(novUsers) {
      generateUser(selectedYear, novUsers, 11, setNovUsersData)
    }
  }, [novUsers, selectedYear])

  let [dec, setDec] = React.useState()
  let [decUsers, setDecUsers] = React.useState()
  let [decData, setDecData] = React.useState()
  let [decUsersData, setDecUsersData] = React.useState()
  React.useEffect(() => {
    if(dec) {
      generateReport(selectedYear, dec, 12, setDecData)
    }
  }, [dec, selectedYear])
  React.useEffect(() => {
    if(decUsers) {
      generateUser(selectedYear, decUsers, 12, setDecUsersData)
    }
  }, [decUsers, selectedYear])

  React.useEffect(() => {
    if(yearReports) {
      let setMonthly = [
        setJan,
        setFeb,
        setMar,
        setApr,
        setMay,
        setJun,
        setJul,
        setAug,
        setSep,
        setOct,
        setNov,
        setDec
      ]
      generateMonthlyData(yearReports, setMonthly)
    }
  }, [yearReports])

  React.useEffect(() => {
    let datas = [ janData, febData, marData, aprData, mayData, junData, julData, augData, sepData, octData, novData, decData ]
    let yearData = generateYearData(reportYearData, datas)
    setReportYearData(yearData)
  }, [ janData, febData, marData, aprData, mayData, junData, julData, augData, sepData, octData, novData, decData ])

  React.useEffect(() => {
    if(yearUsers) {
      let setMonthly = [
        setJanUsers,
        setFebUsers,
        setMarUsers,
        setAprUsers,
        setMayUsers,
        setJunUsers,
        setJulUsers,
        setAugUsers,
        setSepUsers,
        setOctUsers,
        setNovUsers,
        setDecUsers
      ]
      generateMonthlyData(yearUsers, setMonthly)
    }
  }, [yearUsers])

  React.useEffect(() => {
    let datas = [
      janUsersData,
      febUsersData,
      marUsersData,
      aprUsersData,
      mayUsersData,
      junUsersData,
      julUsersData,
      augUsersData,
      sepUsersData,
      octUsersData,
      novUsersData,
      decUsersData
    ]
    let yearUserData = generateYearData(userYearData, datas)
    setUserYearData(yearUserData)
  }, [ janUsersData, febUsersData, marUsersData, aprUsersData, mayUsersData, junUsersData, julUsersData, augUsersData, sepUsersData, octUsersData, novUsersData, decUsersData ])

  // Handle Bar-Chart
  let [barData, setBarData] = React.useState([])

  React.useEffect(() => {
    if(marData) {
      setBarData(
        marData.data.map((data, i) => ({
          "date": String(data.day),
          "reports": data.reports.filter(report => report.status !== 'pending' || report.status !== 'cancelled').length,
          "active": data.reports.filter(report => report.status === 'active').length,
          "missions": data.reports.filter(report => report.status === 'mission' || report.status === 'accomplished').length,
          "invalid": data.reports.filter(report => report.status === 'invalid').length,
        })
      ))
    }
  }, [marData])

  React.useEffect(() => {
    if(marData) {
      setReportMarchData(marData.data.map(data => ({
        "x": String(data.day),
        "y": data.amount
      })))
    }
  }, [marData])

  React.useEffect(() => {
    if(marUsersData) {
      setUserMarchData(marUsersData.data.map(data => ({
        "x": String(data.day),
        "y": data.amount
      })))
    }
  }, [marUsersData])

  // Handle Pie-Chart Data
  let [userChartData, setUserChartData] = React.useState([])
  let [genderReporter, setGenderReporter] = React.useState([])
  let [genderVolunteer, setGenderVolunteer] = React.useState([])
  let [genderFireman, setGenderFireman] = React.useState([])
  let [genderAdmin, setGenderAdmin] = React.useState([])

  const generatePieData = (label, value) => ({ "id": label, "label": label, "value": value })

  React.useEffect(() => {
    if(allUsers) {

      let reporter = generatePieData("reporter", allUsers.filter(user => user.role === 'reporter').length)
      let fireman = generatePieData("fireman", allUsers.filter(user => user.role === 'fireman').length)
      let admin = generatePieData("admin", allUsers.filter(user => user.role === 'dispatcher').length)
      let volunteer = generatePieData("volunteer", allUsers.filter(user => user.role === 'volunteer').length)
      setUserChartData([volunteer, fireman, reporter, admin])

      let maleReporter = generatePieData("male", allUsers.filter(user => user.role === 'reporter' && user.gender === 'male').length)
      let femaleReporter = generatePieData("female", allUsers.filter(user => user.role === 'reporter' && user.gender === 'female').length)
      setGenderReporter([maleReporter, femaleReporter])

      let maleVolunteer = generatePieData("male", allUsers.filter(user => user.role === 'volunteer' && user.gender === 'male').length)
      let femaleVolunteer = generatePieData("female", allUsers.filter(user => user.role === 'volunteer' && user.gender === 'female').length)
      setGenderVolunteer([maleVolunteer, femaleVolunteer])

      let maleFireman= generatePieData("male", allUsers.filter(user => user.role === 'fireman' && user.gender === 'male').length)
      let femaleFireman= generatePieData("female", allUsers.filter(user => user.role === 'fireman' && user.gender === 'female').length)
      setGenderFireman([maleFireman, femaleFireman])

      let maleAdmin = generatePieData("male", allUsers.filter(user => user.role === 'dispatcher' && user.gender === 'male').length)
      let femaleAdmin = generatePieData("female", allUsers.filter(user => user.role === 'dispatcher' && user.gender === 'female').length)
      setGenderAdmin([maleAdmin, femaleAdmin])

    }
  }, [allUsers])

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
            <MapSummary done={done} mission={mission} accomplished={accomplished} invalid={invalid} setShow={setShow}/>
            <br/>
            <MapCluster match={match} markers={show} />
          </div>
        }
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
        {chartData && <LineChart data={chartData} xAxis="March 2019"/> }
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
        { barData && <BarChart xAxis={"March 2019"} data={barData}/> }
      </Container>
      <Container narrow className={styles.mainContainer}>
        <div className={cx(styles.root)}>
          <Text heading2 component="h2" className={styles.subheading}>
            All-time Users
          </Text>
          <Text medium component="p" style={{maxWidth: '560px'}}>
            Understand where your members have conversations, and where messages are most commonly read. Most messages will have multiple readers.
          </Text>
        </div>
      </Container>
      <Container narrow style={{marginBottom: '48px'}}>
        {userChartData && <PieChart data={userChartData}/>}
      </Container>
      <Container narrow style={{marginBottom: '64px'}}>
        <Text heading3 component="h2" className={styles.subheading}>
          Users Gender Stats
        </Text>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{width: '24%'}}>
            {genderReporter &&
              <div>
                <Text component="h3" heading5>
                  Reporter
                </Text>
                <PieChart small data={genderReporter}/>
              </div>
            }
          </div>
          <div style={{width: '24%'}}>
            {genderVolunteer &&
              <div>
                <Text component="h3" heading5>
                  Volunteer
                </Text>
                <PieChart small data={genderVolunteer}/>
              </div>
            }
          </div>
          <div style={{width: '24%'}}>
            {genderFireman &&
              <div>
                <Text component="h3" heading5>
                  Fireman
                </Text>
                <PieChart small data={genderFireman}/>
              </div>
            }
          </div>
          <div style={{width: '24%'}}>
            {genderAdmin &&
              <div>
                <Text component="h3" heading5>
                  Admin
                </Text>
                <PieChart small data={genderAdmin}/>
              </div>
            }
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default SummaryPage