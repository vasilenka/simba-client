import styles from './RoleRequest.module.scss'
import React from 'react'
import cx from 'classnames'
import Text from '../Text/Text'
import Button from '../Button/Button'

const RoleRequest = ({
  className,
  role,
  accept,
  decline,
  ...restProps
  }) => {
  return (
    <div className={cx(styles.root)} {...restProps}>
      <Text heading3 component="h3" className={styles.title}>Role request</Text>
      <Text large component="p" className={styles.text}>This user is requesting to be <Text heading4Alt>{role}</Text></Text>
      <div>
        <Button primary small onClick={accept} style={{ marginRight: '8px' }}>Accept</Button>
        <Button onClick={decline} secondaryAlt small>Decline</Button>
      </div>
    </div>
  )
}

export default RoleRequest