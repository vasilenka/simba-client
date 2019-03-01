import styles from './Homepage.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../../components/Text/Text'
import dayjs from 'dayjs'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import SocketContext from './../../context/SocketContext'
import Spinner from './../../components/Spinner/Spinner'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{ lat: props.lat, lng: props.long }}
    defaultOptions={{
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true
    }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.long }} />}
  </GoogleMap>
))

const Homepage = ({
  className,
  ...restProps,

  }) => {

  const [reports, setReports] = React.useState(null)
  const [newReports, setNewReports] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const socket = React.useContext(SocketContext)

  const fetchReport = () => {
    fetch("http://localhost:3000/reports")
      .then(data => data.json())
      .then(reports => {
        setReports(reports)
        setLoading(false)
      })
      .catch(err => console.log('ERR: ', err))
  }

  React.useEffect(() => {
    fetchReport()
  }, [])

  React.useEffect(() => {
    if(newReports) {
      fetchReport()
    }
  }, [newReports])

  socket.on('new_report', (report) => {
    setNewReports(report)
    setLoading(true)
  })

  return (
    <div styles={cx(styles.root)}>
      <Text display3 component="h1" className={styles.title}>Bakar!</Text>
      <div>
        {loading && <Spinner />}
        {reports && reports.map(report => (
          <div key={report._id} className={cx(styles.card)}>
            <div className={styles.text}>
              <div className={styles.reporter}>
                <div className={styles.profileContainer}>
                  <img className={styles.profileImage} src={report.reporter.profileUrl} alt={report.reporter.name}/>
                </div>
                <div>
                  <Text heading5 component="h3">{report.reporter.name}</Text>
                  <Text small component="p" className={styles.role}>on { dayjs(report.createdAt).format('dddd, DD MMM YYYY') } at { dayjs(report.createdAt).format('hh.MM a') }
                  </Text>
                </div>
              </div>
              <Text large component="h6" className={styles.heading}>{report.address}</Text>
              {
                report.photos.length > 0 && report.photos.map((photo, index) => (
                  <img
                    key={index}
                    style={{
                      borderRadius: '4px',
                      marginRight: '8px',
                      }}
                    src={`http://localhost:3000${photo}`}
                    alt={report.address}
                    width="96px"
                    height="96px"/>
                ))
              }
            </div>
            <div className={styles.map}>
              <MyMapComponent
                isMarkerShown
                lat={Number(report.latitude)}
                long={Number(report.longitude)}
                zoom={16}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places"
                containerElement={<div className={styles.map} />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Homepage