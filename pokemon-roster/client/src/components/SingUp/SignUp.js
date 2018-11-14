import React, { Component } from 'react';
import './SignUp.css';
import { Redirect } from '../Route/Route';
import { registerForm } from '../../constants/registerForm';
import Input from '../Input/Input';

const API = 'http://localhost:5000/';
const CREATE_USER_QUERY = 'auth/signup';

const DEFAULT_FORM_VALUES = { 
  email: '', 
  confirmEmail: '', 
  name: '', 
  password: '', 
  confirmPassword: '', 
  agree: false,
}; 

export default class SignUp extends Component {
  constructor(props) {
     super(props);
     
     this.state = { 
       form: {
        ...DEFAULT_FORM_VALUES,
       },
       touched: {},
       data: null
     }
  }

  componentDidMount () {
   this._mounted = true
  }

  componentWillUnmount () {
    this._mounted = false
  }

  handleBlur(event) { 
    event.preventDefault();

    const target = event.target;
    const name = target.name;
    this.setState({
      touched: { ...this.state.touched, [name]: true },
    });
  }

  handleChange(event) {
    const { form, data } = this.state;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let errors = {};

    if (name === 'confirmEmail') {
      value !== form.email
        ? errors = { confirmEmail: 'Email need to match' }
        : errors = { confirmEmail: null };
    }

    if (name === 'confirmPassword') {
        value !== form.password
          ? errors = { confirmPassword: 'Password need to match' }
          : errors = { confirmPassword: null };
    }

    this.setState({ 
      form: {
        ...form,
        [name]: value
      }, 
      data: {
        ...data, 
        errors: {
          ...errors
        }
      }
    });
  }

 async handleSubmit(event) {
   event.preventDefault();

   const { form } = this.state;
   const { email, password, name } = form 

    const response = await fetch(API + CREATE_USER_QUERY, {
     method: 'POST', 
     body: JSON.stringify({email, name, password}),
     headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    }); 

    const message = await response.json();
    this.setState({ data: message });

    if (message.success && this._mounted) {
        this.setState(
          { form:
           {
            ...DEFAULT_FORM_VALUES
            }
          });
    }
  }

  shouldMarkError(field) {
    const { data, touched } = this.state;
    
    const hasError = (data && data.errors && data.errors[field]) ? data.errors[field] : false;
    const shouldShow = touched[field];

    return hasError && shouldShow ? true : false;
  };

  render() { 
    const { data } = this.state; 

    // redirect after successfull registration
    if (data && data.success) {
      return <Redirect to='/login'  />
    } else { 
      return (
        <div className="SignUp">
          <form className="form-horizontal">
            <h2>Sign Up</h2>
             {
                data && data.message &&
                <h4 className="Signup-error-message">{data.message}</h4>
             }
              <div>
                {
                  registerForm.map((formValue, i) => { 
                    return ( 
                      <Input
                        key={`${formValue.name}-${i}`}
                        id={`${formValue.name}-${i}`}
                        label={formValue.label}
                        placeholder={formValue.placeholder}
                        name={formValue.name}
                        type={formValue.type}
                        errorMessage={data && data.errors[formValue.name]}
                        value={this.state.form[formValue.name]}
                        onBlur={(e) => this.handleBlur(e)}
                        onChange={(e) => this.handleChange(e)}
                        shouldMarkError={() => this.shouldMarkError(formValue.name)}
                      />
                    )
                  })
                }
              </div>

              <button 
                className="Button"
                type="submit"
                onClick={(e) => this.handleSubmit(e)}
              >Register
              </button>
          </form>
        </div>
      )
    }
  }
}