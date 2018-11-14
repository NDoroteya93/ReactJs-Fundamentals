import React, { Component } from 'react';
import Input from '../Input/Input';
import { Redirect } from '../Route/Route';
import './Login.css';

const API = 'http://localhost:5000/';
const LOGIN_USER_QUERY = 'auth/login';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
         email: '', 
         password: ''
      }, 
      response: null
    }
  }

  handleChange(event) {
    const { data } = this.state;
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      data: { 
        ...data, 
        [name]: value
      }
    });
  }

  async handleSubmit(event) { 
    event.preventDefault();

    const { data } = this.state;
    
    const response = await fetch(API + LOGIN_USER_QUERY, { 
      method: 'POST', 
      body: JSON.stringify({...data}),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    }); 

    const message = await response.json();

    console.log(message);

    if (message.success) {
      localStorage.setItem('pokemon-token', JSON.stringify(message.token));
      localStorage.setItem('pokemon-username', JSON.stringify(message.user));
    }

    this.setState({ response: message });
  }

  render() { 
    const { response } = this.state;

    if (response && response.success) {
      // reditrect to pokemon list
      return <Redirect to='/signup'  />
    } else { 
      return (
        <div className="Login">
          <form className="form-horizontal">
            <h2>Login</h2>
            {
              response && response.message &&
              <h4 className="Login-error-message">{response.message}</h4>
            }
            <Input 
              id='email'
              label='Email'
              placeholder='Email'
              value={this.state.data.email}
              name='email'
              onChange={(e) => this.handleChange(e)}
            />

            <Input 
              id='password'
              label='Password'
              value={this.state.data.password}
              name='password'
              type='password'
              onChange={(e) => this.handleChange(e)}
            />

            <button 
              className="Button"
              type="submit"
              onClick={(e) => this.handleSubmit(e)}
            >Login</button>

          </form>
        </div>
      )
    }
  }
}