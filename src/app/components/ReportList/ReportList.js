// import styles from './ReportList.module.scss'
import React from 'react'
// import cx from 'classnames'

import ReportCard from '../ReportCard/ReportCard'
import Text from '../Text/Text';

const ReportList = ({
  match,
  reports,
  type,
  className,
  ...restProps
  }) => {

  return (
    <React.Fragment>
      {reports && reports.length > 0
        ? reports.map(reports =>
            <ReportCard
              key={reports._id}
              id={reports._id}
              type={type}
              name={reports.reporter.name}
              profileUrl={reports.reporter.profileUrl}
              address={reports.address}
              latitude={reports.latitude}
              longitude={reports.longitude}
              photos={reports.photos}
              keterangan={reports.keterangan}
              />
          )
        : type === 'active'
            ? <Text heading4Alt>Tidak ada laporan baru. Semua aman terkendali.</Text>
            : type === 'mission'
              ? <Text heading4Alt>Tidak ada misi sedang berjalan.</Text>
              : <Text heading4Alt>Tidak ada misi yang sudah selesai.</Text>
      }
    </React.Fragment>
  )
}

export default ReportList