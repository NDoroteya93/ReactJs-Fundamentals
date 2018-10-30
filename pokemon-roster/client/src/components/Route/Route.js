import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Renders some UI when the URL matches a location 
// you specify in the Route's path prop.

export default class Route extends Component { 

  static propTypes = { 
    exact: PropTypes.bool, 
    path: PropTypes.string, 
    component: PropTypes.func, 
    render: PropTypes.func
  }

  // popstate, which will be fired whenever the user
  // clicks on the forward or back button
  componentWillMount() { 
    addEventListener('popstate', this.handlePop);
  }

  componentWillUnmount() { 
    removeEventListener('popstate', this.handlePop);
  }

  handlePop = () => {

    // kick of a re-render
     this.forceUpdate();
  }

  // pivotal function to our router, 
  // because this function which is going 
  // to be decide if a current URL matches 
  // the Path 
  matchPath = (pathname, options) => { 
    const { exact = false, path } = options;

    if (!path) { 
      return { 
        path: null, 
        url: pathname, 
        isExact: true,
      }
    }
    // React Routes uses pathToRegex for this

    // .exec return an array containing the matched text
    const match = new RegExp(`${path}`).exec(pathname);

    if (!match) { 
      // there was't match
      return null;
    }

    const url = match[0];
    const isExact = path === url;

    if (exact && !isExact) { 
      // there was a match, but is wasn't 
      // an exact match as specified by
      // the exact prop

      return null;
    }

    return { 
      path, 
      url, 
      isExact
    }
  }
  
  render() { 
    const { path, exact, component, render } = this.props;

    const match = this.matchPath(
      location.pathname, // gloval DOM variable 
      { path, exact }
    ); 

    if (!match) { 
      // Do nothing because the current 
      // locations doesn't match the path prop

      return null;
    }

    if (component) { 
      // the component prop take precent over the 
      // render method. If the current location 
      // matches the path prop, create a new element passing
      // in match as the prop
      return React.createElement(component, { match });
    }

    if (render) { 
      // If there's a match but component
      // was undefined, invoke the render prop
      // passing in match as an argument

      return render({ match });
    }

    return null;
  }
}