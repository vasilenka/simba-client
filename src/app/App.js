import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from './App.module.scss'
import classnames from 'classnames'

import Container from './layouts/Container/Container'
import LeftSection from './layouts/LeftSection/LeftSection'
import MainContent from './layouts/MainContent/MainContent'

import Navbar from './components/Navbar/Navbar'

import Homepage from './pages/Homepage/Homepage'
import Text from './components/Text/Text'

class App extends Component {
  render() {
    return (
      <div className={classnames(styles.root)}>
        <Navbar />
        <Router>
          <React.Fragment>
            <Container fixLeft fixRight className={styles.mainContainer}>
              <MainContent>
                <Link to="/">
                  <Text className={styles.link} link>
                    Homepage
                  </Text>
                </Link>
                <Route exact path="/" component={Homepage} />
              </MainContent>
            </Container>
            <LeftSection fixed className={styles.leftSection}>
            </LeftSection>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

export default App
