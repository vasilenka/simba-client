import styles from './UserPage.module.scss'
import React from 'react'
import cx from 'classnames'

import Text from '../../components/Text/Text'
import Tab from '../../components/Tab/Tab'
import Tabs from '../../components/Tabs/Tabs'
import TabPanels from '../../components/TabPanels/TabPanels'
import TabPanel from '../../components/TabPanel/TabPanel'
import TabList from '../../components/TabList/TabList'
import UserCard from '../../components/UserCard/UserCard'
import Navbar from '../../components/Navbar/Navbar'
import Container from '../../layouts/Container/Container'
import MainContent from '../../layouts/MainContent/MainContent'

import SocketContext from './../../context/SocketContext'

const UserPage = ({
  className,
  ...restProps
}) => {

  const socket = React.useContext(SocketContext)

  let [reporter, setReporter] = React.useState()
  let [fireman, setFireman] = React.useState()
  let [volunteer, setVolunteer] = React.useState()
  let [admin, setAdmin] = React.useState()
  let [newRequest, setNewRequest] = React.useState(null)

  const fetchUser = () =>
    fetch(`${process.env.REACT_APP_WEB_HOST}/users`)
      .then(data => data.json())
      .then(users => {
        setReporter(users.filter(user => user.role === 'reporter'))
        setFireman(users.filter(user => user.role === 'fireman'))
        setVolunteer(users.filter(user => user.role === 'volunteer'))
        setAdmin(users.filter(user => user.role === 'dispatcher'))
      })
      .catch(err => {
        console.log(err)
      })

  React.useEffect(() => {
    fetchUser()
    socket.on('new_request', (request) => {
      setNewRequest(request)
    })
    return function cleanup() {
      socket.on('new_request', (request) => {
        setNewRequest(request)
      })
    }
  }, [])

  React.useEffect(() => {
    if(newRequest) {
      fetchUser()
    }
  }, [newRequest])

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
                    reporter && reporter.length > 0
                      ? reporter.map(reporter =>
                        <UserCard id={reporter._id} key={reporter._id} src={reporter.profileUrl} role={reporter.role} name={reporter.name} />
                      )
                      : <Text heading4 component="h2">No reporter</Text>
                  }
                </TabPanel>
                <TabPanel>
                  {
                    volunteer && volunteer.length > 0
                      ? volunteer.map(volunteer =>
                        <UserCard id={volunteer._id}  key={volunteer._id} src={volunteer.profileUrl} role={volunteer.role} name={volunteer.name} />
                      )
                      : <Text heading4 component="h2">No volunteer</Text>
                  }
                </TabPanel>
                <TabPanel>
                  {
                    fireman && fireman.length > 0
                      ? fireman.map(fireman =>
                        <UserCard id={fireman._id} key={fireman._id} src={fireman.profileUrl} role={fireman.role} name={fireman.name} />
                      )
                      : <Text heading4 component="h2">No fireman</Text>
                  }
                </TabPanel>
                <TabPanel>
                  {
                    admin && admin.length > 0
                      ? admin.map(admin =>
                        <UserCard id={admin._id} key={admin._id} src={admin.profileUrl} role={admin.role} name={admin.name} />
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

export default UserPage