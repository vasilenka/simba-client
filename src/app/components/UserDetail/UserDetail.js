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
import Map from '../Map/Map';

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

  let [allReports, setAllReports] = React.useState()
  let [mission, setMission] = React.useState(0)
  let [invalid, setInvalid] = React.useState(0)

  const fetchUser = id => fetch(`${process.env.REACT_APP_WEB_HOST}/users/${id}`)
    .then(data => data.json())
    .then(user => setUser(user))
    .catch(err => console.log(err))

  const fetchReports = id => fetch(`${process.env.REACT_APP_WEB_HOST}/users/reports/${id}`)
    .then(data => data.json())
    .then(reports => setReports(reports))
    .catch(err => console.log(err))

  React.useEffect(() => {
    fetchUser(match.params.id)
    fetchReports(match.params.id)
  }, [])

  React.useEffect(() => {
    if(reports) {
      setAllReports(reports.filter(report => report.status === "mission" || report.status === "active" || report.status === "accomplished" || report.status === "invalid"))
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
                    style={{marginBottom: '48px'}}
                    />
              }
              {
                user.registerProcess === 'done' && user.status === 'pending'
                  ?   (<div style={{paddingBottom: '64px'}}>
                        <Text heading2 component="h2" className={styles.subheading}>Personal information</Text>
                        <div className={styles.personalInformation}>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} small>Nama</Text>
                            <Text className={styles.infoValue} heading5>{user.fullName}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} small>Jenis kelamin</Text>
                            <Text className={styles.infoValue} heading5>{user.gender}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} small>Tanggal lahir</Text>
                            <Text className={styles.infoValue} heading5>{dayjs(user.birthDate).format('DD MMMM YYYY')}</Text>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} small>Alamat</Text>
                            <div className={styles.infoValue}>
                              <Text heading5 component="p">{user.address}</Text>
                              <Map
                                lat={Number(user.latitude)}
                                long={Number(user.longitude)}
                                isMarkerShown
                                zoom={17}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places"
                                containerElement={<div style={{
                                  willChange: 'transform',
                                  width: '100%',
                                }} />}
                                loadingElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `200px`}} />}
                                />
                            </div>
                          </div>
                          <div className={styles.profileInfo}>
                            <Text className={styles.infoPoint} small>Foto KTP</Text>
                            <Text className={styles.infoValue} component="a" style={{display: 'block', alignSelf: 'flex-start'}} href={`${process.env.REACT_APP_WEB_HOST}${user.idUrl}`}>
                              <div style={{width: '100%', height: '200px'}}>
                                <Image className={styles.ktpImage} src={`${process.env.REACT_APP_WEB_HOST}${user.idUrl}`} fit="cover"/>
                              </div>
                            </Text>
                          </div>
                          <footer className={cx(styles.validateUser)} style={{display: 'inline-flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text heading4 component="h3" className={styles.smallHeading}>Verify user data?</Text>
                            <div>
                              <Button disabled small secondaryAlt style={{ marginRight: '12px' }}>Data invalid</Button>
                              <Button disabled small primary>Data valid</Button>
                            </div>
                          </footer>
                        </div>
                      </div>)
                  :   <Text medium component="p">User belum registrasi akun</Text>
              }
              <div style={{paddingBottom: '48px'}}>
                <div className={cx(styles.activitesHeader)}>
                  <Text heading2 component="h2" style={{ color: 'rgb(72,72,72)'}}>Activities</Text>
                  {reports && mission && invalid && <div className={styles.listContainer}>
                    <Text medium component="h2" className={styles.list}>
                      Total Reports: <Text heading5 className={styles.point}>{allReports.length}</Text>
                    </Text>
                    <Text medium component="h2" className={styles.list}>
                      Total Missions: <Text heading5 className={styles.point}>{mission.length}</Text>
                    </Text>
                    <Text medium component="h2" className={styles.list}>
                      Total Invalid Reports: <Text heading5 className={styles.point}>{invalid.length}</Text>
                    </Text>
                  </div>
                }
                </div>
                {allReports && allReports.length > 0
                  ? allReports.map(report =>
                    <ReportCard
                      key={report._id}
                      id={report._id}
                      type={report.status === 'active' ? 'active' : report.status === 'mission' ? 'missions' : 'completed'}
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
                <Image className={styles.profileImage} fit="cover" src={user.profileUrl || `${process.env.REACT_APP_DEFAULT_IMAGE}`} alt={user.name}/>
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