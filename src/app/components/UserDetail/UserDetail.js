import styles from './UserDetail.module.scss'
import React from 'react'
import cx from 'classnames'
import axios from 'axios'

import Text from '../Text/Text'
import Image from '../Image/Image'
import Button from '../Button/Button'
import Container from '../../layouts/Container/Container'
import Spinner from '../Spinner/Spinner'
import Close from '../../icons/Close/Close'
import RoleRequest from '../RoleRequest/RoleRequest'

const UserDetail = ({
  className,
  match,
  history,
  closeDialog,
  refetchData,
  ...restProps
  }) => {

  let [user, setUser] = React.useState()

  const fetchUser = id => fetch(`https://6dcfd865.ngrok.io/users/${id}`)
    .then(data => data.json())
    .then(user => {
      setUser(user)
    })
    .catch(err => console.log(err))

  React.useEffect(() => {
    fetchUser(match.params.id)
  }, [])

  const acceptRequest = id => {
    axios.patch(`https://6dcfd865.ngrok.io/users/${id}`, {
      requestRole: {
        role: user.requestRole.role,
        status: 'accepted'
      },
      role: user.role
    })
    .then(response => {
      if(response.status === 200) {
        fetchUser(match.params.id)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const declineRequest = id => {
    axios.patch(`https://6dcfd865.ngrok.io/users/${id}`, {
      requestRole: {
        role: user.requestRole,
        status: 'declined'
      },
      role: user.role
    })
    .then(response => {
      if(response.status === 200) {
        fetchUser(match.params.id)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{ padding: '64px' }}>
      <Container narrow>
        {user ?
          <div className={cx(styles.root)}>
            <div className={styles.details}>
              <Button onClick={() => history.goBack()} style={{paddingLeft: 0}} icon={<Close />} />
              <header className={styles.header}>
                <Text heading1 component="h1" className={styles.name}>{user.name}</Text>
                <Text heading5 component="h3" className={styles.role}>{user.role}</Text>
              </header>
              {
                user &&
                user.requestRole &&
                user.requestRole.status === "pending" &&
                  <RoleRequest
                    role={user.requestRole.role}
                    accept={() => acceptRequest(user._id)}
                    decline={() => declineRequest(user._id)}
                    />
              }
            </div>
            <div className={styles.picture}>
              <div className={styles.profileImageContainer}>
                <Image className={styles.profileImage} fit="cover" src={user.profileUrl} alt={user.name}/>
              </div>
            </div>
          </div>
          : <Spinner />
        }
      </Container>
    </div>
  )
}

export default UserDetail