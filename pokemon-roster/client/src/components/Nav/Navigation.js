import React, { Component } from 'react';
import './Navigation.css';
import { Link } from '../Route/Route';

// The Navigation creates links that can be used to navigate
// between routes
export default class Navigation extends Component { 

  constructor(props) {
     super(props);

     this.localStorageUpdated = this.localStorageUpdated.bind(this)

     this.state = { 
       username: null, 
       isLoggedIn: false
     }
  }

  componentDidMount() { 
    if (typeof window !== 'undefined') {
      this.updateState();
      window.addEventListener('storage', this.localStorageUpdated)
    }
  }

  componentWillUnmount(){
    if (typeof window !== 'undefined') {
        window.removeEventListener('storage', this.localStorageUpdated)
    }
  }

  localStorageUpdated(){
    const token = localStorage.getItem('pokemon-token'); 
    const username = localStorage.getItem('pokemon-username'); 

    if (!token && !username) {
      this.updateState()
    } 
  }

  updateState(){
    const token = localStorage.getItem('pokemon-token'); 
    const username = JSON.parse(localStorage.getItem('pokemon-username'));
    
    this.setState({
      isLoggedIn: token ? true : false, 
      username: username ? username.name : ''
    });
  }

  logout() { 
    localStorage.clear('pokemon-token');
    localStorage.clear('pokemon-username');

    this.updateState();
  }

  render() { 
    const { username } = this.state;
    return ( 
      <nav className="Navbar">
        <div className="Navbar-collapse">
          <ul className="Navbar-nav">
            {
              !username &&
              <li className="Navbar-nav-item">
                <Link to='/sign-up'>Signin</Link>
              </li>
            }

            {
              !username && 
              <li className="Navbar-nav-item">
                <Link to='/login'>Login</Link>
              </li>
            }

            {
              username && username.length &&
             <li className="Navbar-nav-item">
              {username}
             </li>
            }

            {
              username && username.length &&
              <li className="Navbar-nav-item" onClick={() => this.logout()}>
                <Link to='/login'>Logout</Link>
              </li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}