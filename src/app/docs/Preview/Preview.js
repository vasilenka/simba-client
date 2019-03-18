import styles from './Preview.module.scss';
import React from 'react';
import classnames from 'classnames';

import Text from './../../primitives/Text/Text';

const Preview = ({ clean, children, className, ...restProps }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <Text
        style={{ marginBottom: '12px', color: '#484848' }}
        heading5
        component="h4"
      >
        Preview
      </Text>
      <div
        className={classnames({
          [styles.root]: true,
          [className]: className,
          [styles.clean]: clean
        })}
        {...restProps}
      >
        {children}
      </div>
    </div>
  );
};

export default Preview;
