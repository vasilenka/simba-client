import styles from './ReportDetail.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../Text/Text'
import Map from '../Map/Map'
import Button from '../Button/Button'
import Image from '../Image/Image'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'

const ReportDetail = ({
  match,
  id,
  history,
  className,
  ...restProps
  }) => {

  let [report, setReport] = React.useState()

  const fetchReport = async id => {
    fetch(`http://localhost:3000/reports/${id}`)
      .then(data => data.json())
      .then(report => {
        setReport(report)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    fetchReport(match.params.reportId)
  }, [])

  return (
    <div className={cx(styles.root)}>
      {
        report && (
          <React.Fragment>
            <div className={styles.details}>
              <Button secondary small onClick={() => history.goBack()}>Back</Button>
              <hr/>
                <Text heading4Alt>{dayjs(report.createdAt).format('D MMMM YYYY, ')} at {dayjs(report.createdAt).format('hh:MM a')}</Text>
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
              <Text>{report.address}</Text>
              <hr/>
              {report.keterangan && report.keterangan.length > 0 && report.keterangan.map(ket => <Text component="p" medium>"{ket}"</Text>)}
              <hr/>
              <div className={styles.reportImagesContainer}>
              {report.photos && report.photos.length > 0 && report.photos.map(photo =>
                <Text component="a" href={`https://6dcfd865.ngrok.io${photo}`} className={styles.reportImage}>
                  <Image src={`https://6dcfd865.ngrok.io${photo}`} alt={report.address} fit="cover" className={styles.image}/>
                </Text>
              )}
              </div>
              <hr/>
              {
                report.status === 'done' && <Button primary>Set mission</Button>
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
              mapElement={<div style={{ height: `100vh`}} />}
              />
          </React.Fragment>
        )
      }
    </div>
  )
}

export default ReportDetail