import React, { Component } from 'react';
import { Route } from '../Route/Route';
import Login from '../Login/Login';
import SignUp from '../SingUp/SignUp';

// Main component renders one of the 
// provided  Routes
export default class Main extends Component { 
  render() { 
    return (
      <main className="Main">
        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUp} />
      </main>
    )
  }
} 