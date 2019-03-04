import styles from './ReportList.module.scss';
import React from 'react';
import cx from 'classnames';
import {Route} from 'react-router-dom'

import ReportCard from '../ReportCard/ReportCard';
import ReportDetail from '../ReportDetail/ReportDetail';

const ReportList = ({
  match,
  reports,
  type,
  className,
  ...restProps
  }) => {

  return (
    <React.Fragment>
      {reports && reports.length > 0 && reports.map(reports =>
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
      )}
    </React.Fragment>
  )
}

export default ReportList