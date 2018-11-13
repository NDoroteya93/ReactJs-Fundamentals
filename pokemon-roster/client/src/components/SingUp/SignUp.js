import React, { Component } from 'react';
import './SignUp.css';
import { Validation } from '../../utils/Validation';
import { Redirect } from '../Route/Route';

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
       errors: {},
       data: null
     }
  }

  componentDidMount() { 
    const errors = Validation({...this.state.form});
    this.setState({ errors });
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
    const { form } = this.state;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // TODO, Change with data message 
    // const errors = Validation({...this.state.form});
    const errors = {};


    if (name === 'confirmEmail' && form.confirmEmail !== form.email) {
      
      this.setState({errors: { email: true, confirmEmail: true }});
    }

    if (name === 'confirmPassword' && form.password !== form.confirmPassword) {
      this.setState({errors: { password: true, confirmPassword: true }});
    }

    this.setState({ 
      form: {
        ...form,
        [name]: value
      }, 
      errors
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

    if (message.success) {
        this.setState(
          { form:
           {
            ...DEFAULT_FORM_VALUES
            }
          });
    }
  }

  setFormValue(input) { 
    const { form } = this.state;

    this.setState(
      form: {
        ...form,
        input
    });
  }
  // validate inputs every time
  // the form is re-rendered
  render() { 
    const {touched, data } = this.state; 

    const shouldMarkError = (field) => {
      const hasError = (data && data.errors && data.errors[field]) ? data.errors[field] : false;
      const shouldShow = touched[field];

      return hasError && shouldShow ? true : false;
    };
    

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
                <h4 className="error-message">{data.message}</h4>
             }
              <div className="form-group">
                <label htmlFor="email" className="control-label">Email</label>
                <div className="control-input">
                  <input 
                    type="text" 
                    id="email" 
                    placeholder="Email" 
                    className={shouldMarkError('email') ? 'form-control error': 'form-control'}  
                    value={this.state.form.email}
                    name="email"
                    onBlur={(e) => this.handleBlur(e)}
                    onChange={(e) => this.handleChange(e)} />
                </div>
                  {
                  shouldMarkError('password') && data && data.errors && data.errors.email &&
                  <div className="error-message">{ data.errors.email }</div>
                  }
              </div>

              <div className="form-group">
                <label htmlFor="confirm-email" className="control-label">Confirm Email</label>
                  <div className="control-input">
                    <input 
                      type="text" 
                      id="confirm-email" 
                      placeholder="Confirm Email" 
                      name="confirmEmail" 
                      value={this.state.form.confirmEmail} 
                      className={shouldMarkError('confirmEmail') ? 'form-control error': 'form-control'} 
                      onBlur={(e) => this.handleBlur(e)}
                      onChange={(e) => this.handleChange(e)} />
                  </div>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="control-label">User Name</label>
                  <div className="control-input">
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="User Name" 
                      className={shouldMarkError('name') ? 'form-control error': 'form-control'} 
                      value={this.state.form.name} 
                      name="name"
                      onBlur={(e) => this.handleBlur(e)}
                      onChange={(e) => this.handleChange(e)} />
                  </div>
                  {
                  shouldMarkError('password') && data && data.errors && data.errors.name &&
                  <div className="error-message">{ data.errors.name }</div>
                  }
              </div>

              <div className="form-group">
                <label htmlFor="password" className="control-label">Password</label>
                <div className="control-input">
                  <input 
                    type="password"
                    id="password"
                    className={shouldMarkError('password') ? 'form-control error': 'form-control'} 
                    value={this.state.form.password} 
                    name="password"
                    onBlur={(e) => this.handleBlur(e)}
                    onChange={(e) => this.handleChange(e)} />
                </div>
                
                {
                  shouldMarkError('password') && data && data.errors && data.errors.password &&
                  <div className="error-message">{ data.errors.password }</div>
                  }
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="control-label">Confirm Password</label>
                  <div className="control-input">
                    <input 
                      type="password" 
                      id="confirm-password"
                      value={this.state.form.confirmPassword} 
                      className={shouldMarkError('confirmPassword') ? 'form-control error': 'form-control'} 
                      name="confirmPassword"
                      onBlur={(e) => this.handleBlur(e)}
                      onChange={(e) => this.handleChange(e)} />
                  </div>
              </div>

              <div className="form-group">
                <label className="checkbox-inline">
                  <input 
                    type="checkbox" 
                    checked={this.state.form.agree}
                    name="agree"
                    onBlur={(e) => this.handleBlur(e)}
                    onChange={(e) => this.handleChange(e)} />I Agree
                </label>
              </div>

              <button 
                className="Button"
                type="submit"
                onClick={(e) => this.handleSubmit(e)}
              >Register</button>
          </form>
        </div>
      )
    }
  }
}