import styles from './UserCard.module.scss';
import React from 'react';
import cx from 'classnames';
import Image from '../Image/Image';
import Text from '../Text/Text';

const UserCard = ({
  src,
  name,
  role,
  className,
  ...restProps
  }) => {
  return (
    <div className={cx(styles.root)} {...restProps}>
      <div className={styles.profileContainer}>
        <Image fit="cover" src={src} alt={name} className={styles.profilePicture}/>
      </div>
      <div>
        <Text heading4 component="h3">{name}</Text>
        <Text small component="h3" className={styles.role}>{role}</Text>
      </div>
    </div>
  )
}

export default UserCard