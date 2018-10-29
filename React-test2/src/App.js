import React, { Component } from 'react';
import './App.css';
import Button from './components/Button/Button';

class App extends Component {

  constructor(props) { 
    // A constructor method of a Reat component always needs to call 
    // super(props) before anything else
    super(props);

    // set Initial state 
    // clicks to store how many times we click on button
    // This object is assigned to this.state in the constructor method
    // which is called is first used
    this.state = { clicks: 0 }
  }

  // change the state of the component, it will call the rende function again 
  // change state with this.setState
  
  // is better to give setState a function, not an object
  // this function gets the old state as an argument, and returns an object that is the new state 
  IncrementItem() {
    //  this.setState({ clicks: this.state.clicks + 1 });
     this.setState(prevState => ({ clicks: prevState.clicks + 1 }));
  }

  // must have render() function 
  // The render() function returns the JSX of the component
  render() {
    return (
      <div className="App-container">
        <div className="App-hook"></div>
        <h1>Increment and Decrease number</h1>
        {/* Give a prop called isIncremented, which is the same as the isMusicPlaying in this.state */}
        <Button isIncremented={this.state.clicks} onClick={this.IncrementItem.bind(this)}/>
      </div>
    );
  }
}


export default App;

