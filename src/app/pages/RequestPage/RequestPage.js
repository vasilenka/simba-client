import styles from './RequestPage.module.scss'
import React from 'react'
import cx from 'classnames'

import Text from '../../components/Text/Text'
import Tab from '../../components/Tab/Tab'
import Tabs from '../../components/Tabs/Tabs'
import TabPanels from '../../components/TabPanels/TabPanels'
import TabPanel from '../../components/TabPanel/TabPanel'
import TabList from '../../components/TabList/TabList'
import UserCard from '../../components/UserCard/UserCard'
import Badge from '../../components/Badge/Badge';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../layouts/Container/Container';
import MainContent from '../../layouts/MainContent/MainContent';

import SocketContext from './../../context/SocketContext'

const RequestPage = ({
  className,
  ...restProps
  }) => {

  let [fireman, setFireman] = React.useState()
  let [newRequest, setNewRequest] = React.useState()
  let [volunteer, setVolunteer] = React.useState()
  let [admin, setAdmin] = React.useState()

  const socket = React.useContext(SocketContext)

  const fetchUser = async () => {
    return fetch(`${process.env.REACT_APP_WEB_HOST}/users`)
      .then(data => data.json())
      .then(users => {
        let fireman = users.filter(user => user.requestRole.role === 'fireman' && user.requestRole.status === 'pending')
        let volunteer = users.filter(user => user.requestRole.role === 'volunteer' && user.requestRole.status === 'pending')
        let admin = users.filter(user => user.requestRole.role === 'dispatcher' && user.requestRole.status === 'pending')
        setFireman(fireman)
        setVolunteer(volunteer)
        setAdmin(admin)
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    fetchUser()
    socket.on('new_request', (request) => {
      console.log('New one incoming')
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
      <Container narrow className={styles.mainContainer}>
        <MainContent>
          <div
            className={cx({
              [styles.root]: true,
              [className]: className,
            })}
            >
            <Text heading1 component="h1" className={styles.pageHeading}>
              Request Role
            </Text>
            <Tabs className={styles.tabs}>
              <TabList>
                <Tab className={styles.menu}>
                  <Text heading5>Volunteer</Text>
                  {
                    volunteer && volunteer.length > 0 && <Badge small className={styles.badge} circle primary>{volunteer.length}</Badge>
                  }
                </Tab>
                <Tab className={styles.menu}>
                  <Text heading5>Fireman</Text>
                  {
                    fireman && fireman.length > 0 && <Badge small className={styles.badge} circle primary>{fireman.length}</Badge>
                  }
                </Tab>
                <Tab className={styles.menu}>
                  <Text heading5>Admin</Text>
                  {
                    admin && admin.length > 0 && <Badge small className={styles.badge} circle primary>{admin.length}</Badge>
                  }
                </Tab>
              </TabList>
              <TabPanels className={styles.panels}>
                <TabPanel>
                  {
                    volunteer && volunteer.length > 0
                      ? volunteer.map(volunteer =>
                        <UserCard key={volunteer._id} id={volunteer._id} src={volunteer.profileUrl} role={volunteer.role} name={volunteer.name} />
                      )
                      : <Text heading4 component="h2">No volunteer request</Text>
                  }
                </TabPanel>
                <TabPanel>
                  {
                    fireman && fireman.length > 0
                      ? fireman.map(fireman =>
                        <UserCard key={fireman._id} id={fireman._id} src={fireman.profileUrl} role={fireman.role} name={fireman.name} />
                      )
                      : <Text heading4 component="h2">No fireman request</Text>
                  }
                </TabPanel>
                <TabPanel>
                  {
                    admin && admin.length > 0
                      ? admin.map(admin =>
                        <UserCard key={admin._id} id={admin._id} src={admin.profileUrl} role={admin.role} name={admin.name} />
                      )
                      : <Text heading4 component="h2">No admin request</Text>
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

export default RequestPage