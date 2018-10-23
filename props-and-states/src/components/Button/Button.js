import React, { Component } from 'react';
import './Buttons.css';
import PropTypes from 'prop-types';

// Class components can store information about their current situation.
// This information is called state, which is stored in JavaScript object 

// State is way to update the UI based on events

// Props are shared information from a parent component to a child component
// They can be a function

/**
* @augments {Component<{  isIncremented:number,   onClick:Function>}
*/
class Button extends Component { 

  render() {
    const number = this.props.isIncremented;
    return (
      <div>
        <h2>{ number }</h2>
        <button title="Increment" className="Button-incerement" onClick={this.props.onClick}></button>
      </div>
    );
  };

}

Button.propTypes = {
  isIncremented: PropTypes.number, 
  onClick: PropTypes.func
};

export default Button;