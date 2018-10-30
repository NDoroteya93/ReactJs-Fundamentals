import React, { Component } from 'react'; 
import PropTypes from 'prop-types';

export default class Link extends Component {

  static propTypes = { 
    to: PropTypes.string.isRequired, 
    replace: PropTypes.bool
  }

  historyPush = (path) => { 
    history.pushState({}, null, path);
  }

  historyReplace = (path) => { 
    history.replaceState({}, null, path);
  }

  handleClick = (event) => { 
    const { replace, to } = this.props;

    event.preventDefault();
    
    replace ? this.historyReplace(to) : this.historyPush(to);
  }

  render() { 
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    )
  }

  }

  c
}