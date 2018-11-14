import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Input.css';

export default class Input extends Component { 

  constructor(props) { 
    super(props); 

    this.state = { 
      touched: {}, 
      errors: {}
    }
  }

  
  render() {

    const { 
      error, 
      label, 
      placeholder, 
      name, 
      type, 
      onBlur, 
      onChange, 
      value,
      shouldMarkError, 
      errorMessage
    } = this.props;

    return (
      <div className="form-group">
        { 
          type !== 'checkbox' && 
          <div>
            <label htmlFor={name} className="control-label">{label}</label>
            <div className="control-input">
              <input 
                type={type} 
                id={name} 
                placeholder={placeholder} 
                className={classNames('form-control', { error: error })}  
                value={value}
                name={name}
                autoComplete={type === 'password' ? 'new-password' : 'off'}
                onBlur={onBlur}
                onChange={onChange} />
            </div>
          </div>
        }
        {
          type === 'checkbox' && 
          <label className="checkbox-inline">
            <input 
              type={type} 
              checked={value}
              name={name}
              onBlur={onBlur}
              onChange={onChange} />{label}
          </label>
        }

        {
          shouldMarkError() &&
          <div className="error-message">{ errorMessage }</div>
        }
      </div>
    )
  }
}

Input.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.bool
  ]),
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string, 
  type: PropTypes.string, 
  shouldMarkError: PropTypes.func, 
  onBlur: PropTypes.func, 
  onChange: PropTypes.func
};

Input.defaultProps = {
  children: null,
  placeholder: '',
  disabled: false,
  label: '',
  errorMessage: null, 
  error: false, 
  type: 'text', 
  value: ''
};
