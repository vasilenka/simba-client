import styles from './FieldInput.module.scss';
import React, { Component } from 'react';
import classnames from 'classnames';
import { bool, func, object, string, oneOf, oneOfType } from 'prop-types';

import * as yup from 'yup';
import { defaultShape } from './helper/fieldInputHelper';

class FieldInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : '',
      tone: this.props.tone,
      message: this.props.message
    };
  }

  componentDidMount = () => {
    const {
      yupShape,
      disabled,
      value,
      type,
      required,
      id,
      setTone,
      passwordLength,
      setMessage
    } = this.props;

    this.validationSchema = yup
      .object()
      .shape(yupShape || defaultShape(type, required, id, passwordLength));

    if (value && !disabled) {
      this.validationSchema
        .validate({
          [type || 'text']: value
        })
        .then(valid => {
          if (valid && setTone && setMessage) {
            setTone();
            setMessage();
          }
        })
        .catch(err => {
          if (setTone && setMessage) {
            setMessage(err.errors[0]);
            setTone('critical');
            this.setState({
              tone: 'critical',
              message: err.errors[0]
            });
          }
        });
    }
  };

  onChange = e => {
    const { onChange, setValue } = this.props;
    let value = e.target.value;
    this.setState({ value }, () => {
      if (setValue) {
        setValue(this.state.value);
      }
    });
    if (onChange) {
      onChange(e, value);
    }
  };

  onBlur = () => {
    let { setMessage, setTone, type } = this.props;

    this.validationSchema
      .validate({
        [type || 'text']: this.state.value
      })
      .then(valid => {
        if (!valid) {
          return Promise.reject();
        }
        this.setState(
          () => ({
            ...this.state,
            tone: '',
            message: ''
          }),
          () => {
            if (setTone && setMessage) {
              setMessage(this.state.message);
              setTone(this.state.tone);
            }
          }
        );
      })
      .catch(err => {
        this.setState(
          () => ({
            ...this.state,
            tone: 'critical',
            message: err.errors[0]
          }),
          () => {
            if (setTone && setMessage) {
              setTone(this.state.tone);
              setMessage(this.state.message);
            }
          }
        );
      });
  };

  onFocus = e => {
    const { onFocus, setTone, setMessage } = this.props;
    this.setState(
      () => ({
        ...this.state,
        tone: '',
        message: ''
      }),
      () => {
        if (setTone && setMessage) {
          setTone(this.state.tone);
          setMessage(this.state.message);
        }
      }
    );
    if (onFocus) {
      onFocus(e);
    }
  };

  onClick = e => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  onKeyDown = e => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  onKeyUp = e => {
    const { onKeyUp } = this.props;
    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  onKeyPress = e => {
    const { onKeyPress } = this.props;
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  render() {
    const {
      autoComplete,
      id,
      className,
      type,
      yupShape,
      required,
      small,
      disabled,
      inline,
      placeholder,
      value,
      setValue,
      passwordLength,
      setMessage,
      tone,
      setTone,
      ...restProps
    } = this.props;

    return (
      <input
        {...restProps}
        disabled={disabled}
        required={required}
        onClick={this.onClick}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onKeyPress={this.onKeyPress}
        type={type}
        id={id}
        autoComplete={autoComplete}
        className={classnames({
          [styles.root]: true,
          [styles.normal]: !small,
          [styles.small]: small,
          [styles.stack]: !inline,
          [styles.inline]: inline,
          [styles[this.state.tone]]: this.state.tone,
          [styles.disabled]: disabled,
          [className]: className
        })}
        placeholder={placeholder}
        value={this.state.value}
      />
    );
  }
}

FieldInput.propTypes = {
  id: string.isRequired,
  className: oneOfType([string, object]),
  type: oneOf(['text', 'email', 'password', 'number']).isRequired,
  required: bool,
  disabled: bool,
  small: bool,
  value: string,
  setValue: func,
  tone: oneOf(['critical', 'neutral', 'positive', '']),
  setTone: func,
  setMessage: func,
  placeholder: string,
  yupShape: object
};

FieldInput.defaultProps = {
  type: 'text',
  disabled: false,
  value: '',
  tone: '',
  inline: false,
  required: false
};

export default FieldInput;
