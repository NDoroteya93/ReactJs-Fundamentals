import React, { Component } from 'react';
import './Navigation.css';

export default class Navigation extends Component { 
  render() { 
    return ( 
      <nav className="Navbar">
        {/* <a className="Navbar-brand">Pokemon</a> */}
        <div className="Navbar-collapse">
          <ul className="Navbar-nav">
            <li className="Navbar-nav-item">
              <a className="Navbar-nav-link">Signup</a>
            </li>
            <li className="Navbar-nav-item">
              <a className="Navbar-nav-link">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}