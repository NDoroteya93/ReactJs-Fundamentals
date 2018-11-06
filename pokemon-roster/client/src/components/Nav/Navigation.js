import React, { Component } from 'react';
import './Navigation.css';
import { Link } from '../Route/Route';

// The Navigation creates links that can be used to navigate
// between routes
export default class Navigation extends Component { 
  render() { 
    return ( 
      <nav className="Navbar">
        {/* <a className="Navbar-brand">Pokemon</a> */}
        <div className="Navbar-collapse">
          <ul className="Navbar-nav">
            <li className="Navbar-nav-item">
              <Link to='/sign-up'>Signup</Link>
              {/* <a href="#" className="Navbar-nav-link">Signup</a> */}
            </li>
            <li className="Navbar-nav-item">
              <Link to='/login'>Login</Link>
              {/* <a href="#" className="Navbar-nav-link">Login</a> */}
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}