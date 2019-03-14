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
        ? reports.map(report =>
            <ReportCard
              key={report._id}
              id={report._id}
              type={type}
              name={report.reporter.name}
              profileUrl={report.reporter.profileUrl || `${process.env.REACT_APP_DEFAULT_IMAGE}`}
              address={report.address}
              latitude={report.latitude}
              longitude={report.longitude}
              photos={report.photos}
              keterangan={report.keterangan}
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