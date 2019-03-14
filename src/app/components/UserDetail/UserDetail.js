import styles from './UserDetail.module.scss'
import React from 'react'
import cx from 'classnames'
import axios from 'axios'
import dayjs from 'dayjs'

import Text from '../Text/Text'
import Image from '../Image/Image'
import Button from '../Button/Button'
import Container from '../../layouts/Container/Container'
import Spinner from '../Spinner/Spinner'
import Close from '../../icons/Close/Close'
import RoleRequest from '../RoleRequest/RoleRequest'
import ReportCard from '../ReportCard/ReportCard';

const UserDetail = ({
  className,
  match,
  history,
  closeDialog,
  refetchData,
  ...restProps
  }) => {

  let [user, setUser] = React.useState()
  let [reports, setReports] = React.useState()

  let [mission, setMission] = React.useState(0)
  let [invalid, setInvalid] = React.useState(0)

  const fetchUser = id => fetch(`${process.env.REACT_APP_WEB_HOST}/users/${id}`)
    .then(data => data.json())
    .then(user => {
      setUser(user)
    })
    .catch(err => console.log(err))

  const fetchReports = id => fetch(`${process.env.REACT_APP_WEB_HOST}/users/reports/${id}`)
    .then(data => data.json())
    .then(reports => {
      setReports(reports)
    })
    .catch(err => console.log(err))

  React.useEffect(() => {
    fetchUser(match.params.id)
    fetchReports(match.params.id)
  }, [])

  React.useEffect(() => {
    if(reports) {
      setMission(reports.filter(report => report.status === 'mission'))
      setInvalid(reports.filter(report => report.status === 'invalid'))
    }
  }, [reports])

  const acceptRequest = id => {
    axios.patch(`${process.env.REACT_APP_WEB_HOST}/users/${id}`, {
      requestRole: {
        role: user.requestRole.role,
        status: 'accepted'
      },
      role: user.role
    })
    .then(response => {
      if(response.status === 200) {
        fetchUser(match.params.id)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const declineRequest = id => {
    axios.patch(`${process.env.REACT_APP_WEB_HOST}/users/${id}`, {
      requestRole: {
        role: user.requestRole.role,
        status: 'declined'
      },
      role: user.role
    })
    .then(response => {
      if(response.status === 200) {
        fetchUser(match.params.id)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{ padding: '64px' }}>
      <Container narrow>
        {user ?
          <div className={cx(styles.root)}>
            <div className={styles.details}>
              <Button onClick={() => history.goBack()} style={{paddingLeft: 0}} icon={<Close />} />
              <header className={styles.header}>
                <Text heading1 component="h1" className={styles.name}>{user.name}</Text>
                <Text heading5 component="h3" className={styles.role}>{user.role}</Text>
              </header>
              {
                user &&
                user.requestRole &&
                user.requestRole.status === "pending" &&
                  <RoleRequest
                    role={user.requestRole.role}
                    accept={() => acceptRequest(user._id)}
                    decline={() => declineRequest(user._id)}
                    />
              }
              {
                user.registerProcess === 'done'
                  ?   (<div style={{marginBottom: '48px'}}>
                        <Text heading3 component="h2" className={styles.subheading}>Personal information</Text>
                        <div className={styles.personalInformation}>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} medium>Nama</Text>
                            <Text className={styles.infoValue} heading5>{user.fullName}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} medium>Jenis kelamin</Text>
                            <Text className={styles.infoValue} heading5>{user.gender}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} medium>Alamat</Text>
                            <Text className={styles.infoValue} heading5>{user.address}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} medium>Tanggal lahir</Text>
                            <Text className={styles.infoValue} heading5>{dayjs(user.birthDate).format('DD MMMM YYYY')}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} medium>Foto KTP</Text>
                            <div className={styles.infoValue}>
                              <Text component="a" href={`${process.env.REACT_APP_WEB_HOST}${user.idUrl}`}>
                                <div style={{width: '96px', height: '72px'}}>
                                  <Image className={styles.ktpImage} src={`${process.env.REACT_APP_WEB_HOST}${user.idUrl}`} fit="cover"/>
                                </div>
                              </Text>
                            </div>
                          </div>
                          <footer className={cx(styles.validateUser)}>
                            <Text heading4 component="h3">Verify user account?</Text>
                            <div>
                              <Button style={{ marginRight: '12px' }} small primaryAlt>Invalid</Button>
                              <Button small primary>Valid</Button>
                            </div>
                          </footer>
                        </div>
                      </div>)
                  : <Text medium component="p">User belum registrasi akun</Text>
              }
              <div>
                <Text heading3 component="h2" className={styles.subheading}>User activities</Text>
                {reports && mission && invalid && <div className={styles.listContainer}>
                  <Text medium component="h2" className={styles.list}>
                    Total Reports: <Text heading5 className={styles.point}>{reports.length}</Text>
                  </Text>
                  <Text medium component="h2" className={styles.list}>
                    Total Missions: <Text heading5 className={styles.point}>{mission.length}</Text>
                  </Text>
                  <Text medium component="h2" className={styles.list}>
                    Total Invalid Reports: <Text heading5 className={styles.point}>{invalid.length}</Text>
                  </Text>
                  </div>
                }
                {reports && reports.length > 0
                  ? reports.map(report =>
                    <ReportCard
                      key={report._id}
                      id={report._id}
                      type={report.status === 'active' ? 'active' : report.status === 'mission' ? 'missions' : 'accomplished'}
                      name={report.reporter.name}
                      profileUrl={report.reporter.profileUrl}
                      address={report.address}
                      latitude={report.latitude}
                      longitude={report.longitude}
                      photos={report.photos}
                      keterangan={report.keterangan}
                      />)
                  : <Text heading5 component="h5">This user doesn't have any report yet!</Text>
                }
              </div>
            </div>
            <div className={styles.picture}>
              <div className={styles.profileImageContainer}>
                <Image className={styles.profileImage} fit="cover" src={user.profileUrl} alt={user.name}/>
              </div>
            </div>
          </div>
          : <Spinner />
        }
      </Container>
    </div>
  )
}

export default UserDetail