 import React, {Component} from 'react';
 import './Card.css';


 class CardDetails extends Component { 

   render() {
     const { id, name, url, bio } = this.props;

     return ( 
      <div className="Card Card-details">
       <img src={url} alt={name} />
        <div className="Card-content">
          <span>{id + 1}</span>
          <p className="Card-descipription">
            {bio}
          </p>
        </div>
      </div>
     )
   }
 }

 export default CardDetails;