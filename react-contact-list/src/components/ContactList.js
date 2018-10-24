import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ContactList.css';

/**
* @augments {Component<{  data:shape({    firstName:string,    lastName:string,    phone:string,    email:string  >}
*/
class ContactList extends Component {

  isActive(email) { 
    return email === this.props.isActive ? 'Contact Contact-active' : 'Contact'
  }

  render() {
    const data = this.props.data;
    return (
      data.map((contact) => {
        return (
          <div className={this.isActive(contact.email)} data-id="id"  key={contact.email} onClick={() => this.props.onToggle(contact)} >
            <span className="Contact-avatar small">&#9787;</span>
            <span className="Contact-title">{contact.firstName} {contact.lastName}</span>
          </div>
        );
      })
    );
  }
}

ContactList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
   })
  ), 
  isActive: PropTypes.string, 
  onToggle: PropTypes.func
};

export default ContactList;