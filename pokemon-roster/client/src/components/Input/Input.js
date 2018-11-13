import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import composeEventHandler from '../../utils/composeEventHandler';

export default class Input extends Component { 

  constructor(props) { 
    super(props); 

    this.state = { 
      touched: {}, 
      errors: {}
    }
  }

  
  render() {
    const { error, placeholder, name, type, onBlur, onChange } = this.props;
    return (
      <div className="form-group">
      <label htmlFor={name} className="control-label">Email</label>
        <div className="control-input">
          <input 
            type={type} 
            id={name} 
            placeholder={placeholder} 
            className={classNames('form-control', { error: error })}  
            value={this.state.form.email}
            name={name}
            onBlur={composeEventHandler(onBlur)}
            onChange={composeEventHandler(onChange)} />
        </div>
        {/* {
          shouldMarkError('password') && data && data.errors && data.errors.email &&
          <div className="error-message">{ data.errors.email }</div>
        } */}
      </div>
    )
  }
}

Input.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string, 
  type: PropTypes.string, 
  setFormValues: PropTypes.func, 
  onBlur: PropTypes.func, 
  onChange: PropTypes.func
};

Input.defaultProps = {
  children: null,
  placeholder: '',
  disabled: false,
  label: '',
  errorMessage: null, 
  type: 'text'
};
