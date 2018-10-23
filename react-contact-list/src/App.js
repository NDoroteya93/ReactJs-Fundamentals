import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

/**
* @augments {Component<{  data:shape({    firstName:string,    lastName:string,    phone:string,    email: Proptypes.string  >}
*/
class App extends Component {
  render() {

    const data = this.props.data;

    return (
      <div className="App">
        <header>&#9993; Contact Book</header>
        <div className="App-book">
          <div className="App-list">
            <h1>Contacts</h1>
            <div className="App-content">
              {MakeContactList(data)}
            </div>
          </div>
          <div className="App-details">
            <h1>Details</h1>
            <div className="App-content">
              <div className="App-contact-info">
                  <div className="col">
                      <span className="App-contact-avatar">&#9787;</span>
                  </div>
                  <div className="col">
                      <span className="App-contact-name">Ivan</span>
                      <span className="App-contact-name">Ivanov</span>
                  </div>
              </div>
              <div className="App-contact-info">
                  <span className="App-contact-info-line">&phone; 0887 123 456</span>
                  <span className="App-contact-info-line">&#9993; i.ivanov@gmail.com</span>
              </div>
            </div>
        </div>
      </div>
      <footer>Contact Book SPA &copy; 2017</footer>
    </div>
    );
  }
}

const MakeContactList = data => (
  data.map((contact) => {
    return (
      <div className="App-contact" data-id="id"  key={contact.email}>
        <span className="App-contact-avatar small">&#9787;</span>
        <span className="App-contact-title">{contact.firstName} {contact.lastName}</span>
    </div>
    );
  })
);

App.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  })
};

export default App;
