import styles from './PreviewBroadcast.module.scss'
import React from 'react'
import cx from 'classnames'

import RightSection from '../../layouts/RightSection/RightSection'
import Text from '../../components/Text/Text'

const PreviewBroadcast = ({
  children,
  className,
  ...restProps
  }) => {

  return (
    <RightSection
      fixed
      className={cx({
        [styles.root]: true,
      })}
      >
      <div
        className={cx({
          [styles.previewBroadcastContainer]: true,
          [className]: className,
        })}>
        <Text heading3 style={{color: '#ffffff'}}>Preview</Text>
      </div>
    </RightSection>
  )
}

export default PreviewBroadcast