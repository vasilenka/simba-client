import styles from './CheckMark.module.scss';
import React, { useEffect, useContext, useState } from 'react';
import classnames from 'classnames';
import { CheckboxContext } from '../context/context';

const Checkmark = ({
  large,
  className,
  isChecked,
  isDisabled,
  component,
  ...restProps
}) => {

  let Component = component ? component : 'span'

  const context = useContext(CheckboxContext)

  let [disabled, setDisable] = useState(false)
  let [checked, setChecked] = useState()
  let [value, setValue] = useState()

  const handleChange = e => {
    if (!disabled) {
      setChecked(!checked)
      if (context.onChange) {
        context.onChange(!checked)
      }
    }
  };

  useEffect(() => {
      setValue(context.value)
    }, [value])

  useEffect(() => {
    setDisable(context.isDisabled)
  }, [disabled])

  useEffect(() => {
    setChecked(context.isChecked)
  }, [checked])

  return (
    <Component
      className={classnames({
        [styles.root]: true,
        [className]: className,
        [styles.normal]: !large,
        [styles.large]: large
      })}
      {...restProps}
    >
      <input
        id={`checkbox__${context.name}${context.id}`}
        type="checkbox"
        name={context.name}
        className={classnames({
          [styles.box]: true,
          [styles.normal]: !large,
          [styles.large]: large
        })}
        checked={checked || false}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      <div
        onClick={handleChange}
        className={classnames({
          [styles.checkmark]: true,
          [styles.hoverCheckmark]: context.hover,
          [styles.normal]: !large,
          [styles.large]: large,
          [styles.disabled]: disabled
        })}
        onMouseOver={context.onHover}
        onMouseLeave={context.onLeave}
      />
    </Component>
  );
};

export default Checkmark;
