import styles from './ReportDetail.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../Text/Text'
import Map from '../Map/Map'
import Button from '../Button/Button'
import Image from '../Image/Image'
import dayjs from 'dayjs'
import axios from 'axios'

const ReportDetail = ({
  match,
  id,
  history,
  className,
  ...restProps
  }) => {

  let [report, setReport] = React.useState()

  const fetchReport = async id => {
    fetch(`${process.env.REACT_APP_WEB_HOST}/reports/${id}`)
      .then(data => data.json())
      .then(report => {
        setReport(report)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    fetchReport(match.params.reportId)
  }, [])

  const setMission = id => {
    axios.patch(`${process.env.REACT_APP_WEB_HOST}/reports/${id}`, {
      dispatcher: '5c7d8ab3940a7c551d7b0c5e',
      status: 'mission',
    })
    .then(res => res.data)
    .then(report => setReport(report))
    .catch(err => console.log(err))
  }

  const setInvalid = id => {
    axios.patch(`${process.env.REACT_APP_WEB_HOST}/reports/${id}`, {
      dispatcher: '5c7d8ab3940a7c551d7b0c5e',
      status: 'invalid',
    })
    .then(res => res.data)
    .then(report => setReport(report))
    .catch(err => console.log(err))
  }

  const setCompleted = id => {
    axios.patch(`${process.env.REACT_APP_WEB_HOST}/reports/${id}`, {
      dispatcher: '5c7d8ab3940a7c551d7b0c5e',
      status: 'accomplished',
    })
    .then(res => res.data)
    .then(report => setReport(report))
    .catch(err => console.log(err))
  }

  return (
    <div className={cx(styles.root)}>
      {
        report && (
          <React.Fragment>
            <div className={styles.details}>
              <header className={styles.header}>
                <Button className={styles.backSecondary} secondary small onClick={() => history.goBack()}>Back</Button>
                <Text heading3 className={styles.reportStatus}>
                {
                  report.status === 'active' ? 'Active report'
                    : report.status === 'mission' ? 'On-going mission'
                      : report.status === 'accomplished' ? 'Mission accomplised'
                        : report.status
                }
                </Text>
              </header>
              <hr/>
                {report.createdAt &&
                  <div style={{padding: '4px 0'}}>
                    <Text medium style={{color: '#767676' ,marginRight: '8px'}}>Reported:</Text>
                    <Text heading5>{dayjs(report.createdAt).format('D MMMM YYYY, ')} at {dayjs(report.createdAt).format('hh:mm a')}</Text>
                  </div>
                }
                {report.processedAt &&
                  <div style={{padding: '4px 0'}}>
                    <Text medium style={{color: '#767676' ,marginRight: '8px'}}>Processed:</Text>
                    <Text heading5>{dayjs(report.processedAt).format('D MMMM YYYY, ')} at {dayjs(report.processedAt).format('hh:mm a')}</Text>
                  </div>
                }
                {report.completedAt &&
                  <div style={{padding: '4px 0'}}>
                    <Text medium style={{color: '#767676' ,marginRight: '8px'}}>Accomplished:</Text>
                    <Text heading5>{dayjs(report.completedAt).format('D MMMM YYYY, ')} at {dayjs(report.completedAt).format('hh:mm a')}</Text>
                  </div>
                }
              <hr/>
              <div className={styles.profileContainer}>
                <div className={styles.profileImageContainer}>
                  <Image fit="cover" src={report.reporter.profileUrl} alt={report.reporter.name} className={styles.profileImage} />
                </div>
                <div>
                  <Text component="h3" heading5 className={styles.name}>{report.reporter.name}</Text>
                  <Text small className={styles.role}>{report.reporter.role}</Text>
                </div>
              </div>
              <hr/>
              <Text heading4Alt>{report.address}</Text>
              <hr/>
              <div className={styles.reportImagesContainer}>
              {report.photos && report.photos.length > 0 && report.photos.map((photo, index) =>
                <Text key={index} component="a" href={`${process.env.REACT_APP_WEB_HOST}${photo}`} className={styles.reportImage}>
                  <Image src={`${process.env.REACT_APP_WEB_HOST}${photo}`} alt={report.address} fit="cover" className={styles.image}/>
                </Text>
              )}
              </div>
              <hr/>
              {report.keterangan && report.keterangan.length > 0
                ? report.keterangan.map((ket, index) => <Text component="p" key={index} medium>"{ket}"</Text>)
                : <Text medium>Tidak ada keterangan yang ditambahkan oleh pelapor.</Text>
              }
              <hr/>
              {
                report.status === 'active' && (
                  <div className={cx(styles.reportAction)}>
                    <Button style={{marginRight: '12px'}} onClick={() => setInvalid(report._id)} primaryAlt>Laporan tidak benar</Button>
                    <Button onClick={() => setMission(report._id)} primary>Luncurkan sebagai misi</Button>
                  </div>
                )
              }
              {
                report.status === 'mission' && (
                  <div className={cx(styles.reportAction)}>
                    <Button style={{justifySelf: 'flex-end'}} onClick={() => setCompleted(report._id)} primary>Set completed</Button>
                  </div>
                )
              }
            </div>
            <Map
              isMarkerShown
              lat={Number(report.latitude)}
              long={Number(report.longitude)}
              zoom={16}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places"
              containerElement={<div className={styles.map} />}
              loadingElement={<div style={{ height: `100%` }} />}
              mapElement={<div className={styles.mapElement}/>}
              />
            <div className={styles.backPrimary}>
              <Button secondary small onClick={() => history.goBack()}>Back</Button>
            </div>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default ReportDetail