import React, { Component } from 'react';
import './Slider.css';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Slider extends Component {

  render() {
    const { episode, prev, next, roster } = this.props;
    return (
      <div className="Slider">
        <div className="Slider-content"> 
          { episode &&
            <LazyLoadImage
              alt=""
              src={episode.url}
              width={400} />
          }
        </div>
        {/* ACTION BUTTONS */}
        { episode &&
          <button className="Slider-btn Slider-btn-left" 
            onClick={ () => prev() }
            disabled={episode.id === 0}
          >&lt;</button>
        }
        { episode && roster && roster.length > 0 &&
          <button className="Slider-btn Slider-btn-right" 
            onClick={ () => next() }
            disabled={episode.id === roster.length - 2}
            >&gt;</button>
        }
      </div>
    );
  }
}

Slider.propTypes = {
  isLoading: PropTypes.bool, 
  episode: PropTypes.shape({
    id: PropTypes.number, 
    url: PropTypes.string
  }), 
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
