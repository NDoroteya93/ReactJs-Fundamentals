import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component { 

  render(){
  const { id, name, url } = this.props;
    return (
      <div id={`Card-${id}`} className="Card">
       <img src={url} alt={name} />
      </div>
    )
  }
}

Card.propTypes = { 
  episode: PropTypes.shape({
    id: PropTypes.string, 
    name: PropTypes.string, 
    url: PropTypes.string, 
    bio: PropTypes.string
  }), 
}
export default Card;

