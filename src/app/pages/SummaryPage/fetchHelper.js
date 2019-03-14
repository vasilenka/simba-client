export const fetchReports = (setDone, setMission, setAccomplished, setInvalid) => {
  return fetch(`${process.env.REACT_APP_WEB_HOST}/reports`)
    .then(data => data.json())
    .then(reports => {

      let done = reports.filter(report => report.status === 'active')
      let mission = reports.filter(report => report.status === 'mission')
      let accomplished = reports.filter(report => report.status === 'accomplished')
      let invalid = reports.filter(report => report.status === 'invalid')

      setDone(done)
      setMission(mission)
      setAccomplished(accomplished)
      setInvalid(invalid)
    })
    .catch(err => console.log('ERR: ', err))
}

export const fetchReportsYear = (year, setYearReports) => {
  fetch(`${process.env.REACT_APP_WEB_HOST}/reports/year/${year}`)
    .then(data => data.json())
    .then(reports => setYearReports(reports.filter(report => report.status !== "cancelled" && report.status !== "pending")))
    .catch(err => console.log('ERR: ', err))
}

export const fetchUsers = setAllUsers => {
  return fetch(`${process.env.REACT_APP_WEB_HOST}/users`)
    .then(data => data.json())
    .then(users => setAllUsers(users))
    .catch(err => console.log('ERR: ', err))
}

export const fetchUsersYear = (year, setYearUsers) => {
  fetch(`${process.env.REACT_APP_WEB_HOST}/users/year/${year}`)
    .then(data => data.json())
    .then(users => setYearUsers(users))
    .catch(err => console.log('ERR: ', err))
}