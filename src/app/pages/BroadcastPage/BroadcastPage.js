import styles from './BroadcastPage.module.scss'
import React from 'react'
import cx from 'classnames'

import Container from '../../layouts/Container/Container'
import Navbar from '../../components/Navbar/Navbar'
import Text from '../../components/Text/Text'
import MainContent from '../../layouts/MainContent/MainContent'
// import Button from '../../components/Button/Button'
// import FieldInput from '../../components/FieldInput/FieldInput'
// import PreviewBroadcast from '../../broadcast/PreviewBroadcast/PreviewBroadcast';
// import Luna from '../../components/Luna/Luna';
// import Image from '../../components/Image/Image';

const BroadcastPage = ({
  className,
  ...restProps
  }) => {

  return (
    <React.Fragment>
      <Navbar/>
      <Container narrow className={cx(styles.broadcastView)}>
        <MainContent>
          <Text heading1 component="h1" className={styles.pageTitle}>Broadcasts</Text>
        </MainContent>
      </Container>
    </React.Fragment>
  )
}

export default BroadcastPage