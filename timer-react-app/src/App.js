import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) { 
    super(props);
  
    this.state = { 
      time: 0, 
      start: 0
    }

    // Bind in constructor
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() { 
    // store the interval 
    // set the start time to the current timestamp 
    this.setState((prevState) => ({
      time: prevState.time, 
      start: Date.now() - prevState.time
    }));

    this.timer = setInterval(() => this.setState((prevState) => ({
      time: Date.now() - prevState.start
    })), 1000);
  }

  stopTimer() { 
    clearInterval(this.timer);
  }

  resetTimer() { 
    this.setState({ time: 0 })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Timer</p>
        </header>
        <main className="App-main">
          <h3>{this.state.time}</h3>

          <button type="button" onClick={this.startTimer}>Start</button>
          <button type="button" onClick={this.stopTimer}>Stop</button>
          <button type="button" onClick={this.resetTimer}>Reset</button>
        </main>
      </div>
    );
  }
}

export default App;
