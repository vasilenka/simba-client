import styles from './UserCard.module.scss'
import React from 'react'
import cx from 'classnames'
import Image from '../Image/Image'
import Text from '../Text/Text'
import {Link} from 'react-router-dom'

const UserCard = ({
  src,
  name,
  match,
  id,
  role,
  className,
  ...restProps
  }) => {
  return (
    <Link to={`/users/${id}`}>
      <div className={cx(styles.root)} {...restProps}>
        <div className={styles.profileContainer}>
          <Image fit="cover" src={src} alt={name} className={styles.profilePicture}/>
        </div>
        <div>
          <Text heading4 component="h3" className={styles.name}>{name}</Text>
          <Text small component="h3" className={styles.role}>{role}</Text>
        </div>
      </div>
    </Link>
  )
}

export default UserCard