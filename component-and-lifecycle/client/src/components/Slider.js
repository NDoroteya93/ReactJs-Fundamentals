import React, { Component } from 'react';
import './Slider.css';
import PropTypes from 'prop-types';

class Slider extends Component {

  render() {
    const { episode, prev, next } = this.props;
    return (
      <div className="Slider">
        <div className="Slider-content"> 
          { episode && 
            <img src={episode.url} alt="" />
          }
        </div>
        {/* ACTION BUTTONS */}
        <button className="Slider-btn Slider-btn-left" onClick={ () => prev() }>&lt;</button>
        <button className="Slider-btn Slider-btn-right" onClick={ () => next() }>&gt;</button>
      </div>
    );
  }
}

Slider.propTypes = {
  isLoading: PropTypes.bool, 
  episode: PropTypes.shape({
    id: PropTypes.number, 
    url: PropTypes.string
  }).isRequired, 
  roster: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string, 
      name: PropTypes.string, 
      url: PropTypes.string, 
      bio: PropTypes.string
    })
  ), 
  prev: PropTypes.func, 
  next: PropTypes.func
}

export default Slider;
