import styles from './UserPage.module.scss'
import React, { Component } from 'react'
import cx from 'classnames'

import Text from '../../components/Text/Text'
import Tab from '../../components/Tab/Tab'
import Tabs from '../../components/Tabs/Tabs'
import TabPanels from '../../components/TabPanels/TabPanels'
import TabPanel from '../../components/TabPanel/TabPanel'
import TabList from '../../components/TabList/TabList'
import UserCard from '../../components/UserCard/UserCard'
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../layouts/Container/Container';
import MainContent from '../../layouts/MainContent/MainContent';

class UserPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      reporter: [],
      fireman: [],
      volunteer: [],
      admin: [],
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/users')
      .then(data => data.json())
      .then(users => {

        let reporter = users.filter(user => user.role === 'reporter')
        let fireman = users.filter(user => user.role === 'fireman')
        let volunteer = users.filter(user => user.role === 'volunteer')
        let admin = users.filter(user => user.role === 'dispatcher')
        this.setState({
          reporter,
          fireman,
          volunteer,
          admin,
        })

      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    let {children, className, ...restProps} = this.props
    return (
      <React.Fragment>
        <Navbar />
        <Container fixLeft fixRight className={styles.mainContainer}>
          <MainContent>
            <div
              className={cx({
                [styles.root]: true,
                [className]: className,
              })}
              >
              <Text heading1 component="h1" className={styles.pageHeading}>
                Users
              </Text>
              <Tabs className={styles.tabs}>
                <TabList>
                  <Tab className={styles.menu}>
                    <Text heading5>Reporter</Text>
                  </Tab>
                  <Tab className={styles.menu}>
                    <Text heading5>Volunteer</Text>
                  </Tab>
                  <Tab className={styles.menu}>
                    <Text heading5>Fireman</Text>
                  </Tab>
                  <Tab className={styles.menu}>
                    <Text heading5>Admin</Text>
                  </Tab>
                </TabList>
                <TabPanels className={styles.panels}>
                  <TabPanel>
                    {
                      this.state.reporter.length > 0
                        ? this.state.reporter.map(reporter =>
                          <UserCard key={reporter.profileUrl} src={reporter.profileUrl} role={reporter.role} name={reporter.name} />
                        )
                        : <Text heading4 component="h2">No reporter</Text>
                    }
                  </TabPanel>
                  <TabPanel>
                    {
                      this.state.volunteer.length > 0
                        ? this.state.volunteer.map((volunteer, index) =>
                          <UserCard key={volunteer.profileUrl} src={volunteer.profileUrl} role={volunteer.role} name={volunteer.name} />
                        )
                        : <Text heading4 component="h2">No volunteer</Text>
                    }
                  </TabPanel>
                  <TabPanel>
                    {
                      this.state.fireman.length > 0
                        ? this.state.fireman.map((fireman, index) =>
                          <UserCard key={fireman.profileUrl} src={fireman.profileUrl} role={fireman.role} name={fireman.name} />
                        )
                        : <Text heading4 component="h2">No fireman</Text>
                    }
                  </TabPanel>
                  <TabPanel>
                    {
                      this.state.admin.length > 0
                        ? this.state.admin.map((admin, index) =>
                          <UserCard key={admin.profileUrl} src={admin.profileUrl} role={admin.role} name={admin.name} />
                        )
                        : <Text heading4 component="h2">No admin</Text>
                    }
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </MainContent>
        </Container>
      </React.Fragment>
    )
  }
}

export default UserPage