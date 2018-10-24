import React, { Component } from 'react';
import './App.css';
import ContactList from './components/ContactList';
import contacts from './api/contacts.json';

class App extends Component {

  constructor(props) { 
    super(props);

    this.state = { 
      activeContact: contacts[0]
    }
  }

  showContactInfo = (contact) => {
    if (contact) {
      this.setState({ activeContact: contact });
    }
  }

  render() {

    const activeContact = this.state.activeContact;

    return (
      <div className="App">
        <header>&#9993; Contact Book</header>
        <div className="App-book">
          <div className="App-list">
            <h1>Contacts</h1>
            <div className="App-content">
              <ContactList data={contacts} isActive={activeContact.email} onToggle={this.showContactInfo}/>
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
                      <span className="App-contact-name">{ activeContact.firstName }</span>
                      <span className="App-contact-name">{ activeContact.lastName }</span>
                  </div>
              </div>
              <div className="App-contact-info">
                  <span className="App-contact-info-line">&#9742; { activeContact.phone }</span>
                  <span className="App-contact-info-line">&#9993; { activeContact.email }</span>
              </div>
            </div>
        </div>
      </div>
      <footer>Contact Book SPA &copy; 2017</footer>
    </div>
    );
  }
}

export default App;
