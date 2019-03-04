import styles from './Homepage.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../../components/Text/Text'

import Navbar from '../../components/Navbar/Navbar';
import Container from '../../layouts/Container/Container';
import MainContent from '../../layouts/MainContent/MainContent';

const Homepage = ({
  className,
  active,
  match,
  ...restProps,
  }) => {

  return (
    <React.Fragment>
      <Navbar />
      <Container fixLeft fixRight className={styles.mainContainer}>
        <MainContent>
          <div styles={cx(styles.root)}>
            <Text heading1 component="h1" className={styles.pageHeading}>
              Bakar!
            </Text>
          </div>
        </MainContent>
      </Container>
    </React.Fragment>
  )
}

export default Homepage