import styles from './ReportCard.module.scss'
import React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'

// import Map from '../Map/Map'

import Text from '../Text/Text';
// import Image from '../Image/Image';

const ReportCard = ({
  className,
  match,
  id,
  profileUrl,
  type,
  name,
  latitude,
  longitude,
  address,
  createdAt,
  photos,
  ...restProps
  }) => {

  return (
    <Link to={`/${type}/${id}`}>
      <div className={cx(styles.root)}>
        <div className={styles.text}>
          <div className={styles.reporter}>
            <div className={styles.profileContainer}>
              <img className={styles.profileImage} src={profileUrl} alt={name}/>
            </div>
            <div>
              <Text heading5 component="h3" className={styles.name}>{name}</Text>
              <Text small component="p" className={styles.role}>on { dayjs(createdAt).format('dddd, DD MMM YYYY') } at { dayjs(createdAt).format('hh.MM a') }
              </Text>
            </div>
          </div>
          <Text large component="h6" className={styles.address}>{address}</Text>
          {/* <div className={styles.eventImages}>
            {
              photos.length > 0 && photos.map((photo, index) =>
                <div key={index} className={styles.imageContainer}>
                  <Image
                    src={`http://localhost:3000${photo}`}
                    alt={address}
                    className={styles.image}
                    fit="cover"
                    />
                </div>
              )
            }
          </div> */}
        </div>
        {/* <div className={styles.map} style={{height: `${height}px`}}>
          <MyMapComponent
            isMarkerShown
            lat={Number(latitude)}
            long={Number(longitude)}
            zoom={16}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNREXU2Q7SUSMuBdiDxHRzY_SRd-_QVGc&v=3.exp&libraries=geometry,drawing,places"
            containerElement={<div className={styles.map} />}
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `${height}px`, minHeight: '216px' }} />}
            />
        </div> */}
      </div>
    </Link>
  )
}

export default ReportCard