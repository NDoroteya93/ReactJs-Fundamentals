import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Route.css';

const instances = [];

 const historyPush = (path) => {
    window.history.pushState({}, null, path);
    instances.forEach(instance => instance.forceUpdate())
  }

  // replace the current entry in the history stack
  // instead of adding a new one 
  const historyReplace = (path) => {
    window.history.replaceState({}, null, path);
    instances.forEach(instance => instance.forceUpdate())
  }


// keep track of which <Route>s have been rendered
// by pushing their instances to an array, then whenever a location change occurs
const register = (comp) => instances.push(comp);
const unregister = (comp) => instances.splice(instances.indexOf(comp));


  // pivotal function to our router, 
  // because this function which is going 
  // to be decide if a current URL matches 
  // the Path 
  const matchPath = (pathname, options) => { 
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
  

// Renders some UI when the URL matches a location 
// you specify in the Route's path prop.

class Route extends Component { 

  // constructor(props) { 
  //   super(props);

  //   this.state.instances = [];
  // }

  static propTypes = { 
    exact: PropTypes.bool, 
    path: PropTypes.string, 
    component: PropTypes.func, 
    render: PropTypes.func
  }

  // popstate, which will be fired whenever the user
  // clicks on the forward or back button
  componentWillMount() { 
    register(this);
    window.addEventListener('popstate', this.handlePop);
  }

  componentWillUnmount() { 
    unregister(this);
    window.removeEventListener('popstate', this.handlePop);
  }

  // Routes that are rendering the UI based off the current URL, it makes sense to also 
  // to give Routes the ability to listen for and re-render whenever popstate event occurs
  handlePop = () => {
    // kick of a re-render
     this.forceUpdate();
  }

  render() { 
    const { path, exact, component, render } = this.props;

    const match = matchPath(
      window.location.pathname, // gloval DOM variable 
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

class Link extends Component {

  static propTypes = { 
    to: PropTypes.string.isRequired, 
    replace: PropTypes.bool
  }


  handleClick = (event) => { 
    // to - is a string and is the location to link to
    // replace is a boolean 
    const { replace, to } = this.props;

    event.preventDefault();
    
    replace ? historyReplace(to) : historyPush(to);
  }

  // return an anchor tag 
  render() { 
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.handleClick} className="Navbar-nav-link">
        {children}
      </a>
    )
  }
}


// rendering any UI, 
class Redirect extends Component { 

  static defaultProps = { 
    push: false
  }

  static propTypes = { 
    to: PropTypes.string.isRequired, 
    push: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const { to, push } = this.props;

    push ? historyPush(to) : historyReplace(to);
  }

  render() { 
    return null;
  }
}

export { Link, Route, Redirect }