import React, { Component } from 'react';

import './App.css';
import Navigation from './components/Nav/Navigation';
import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Main />
      </div>
    );
  }
}

export default App;
