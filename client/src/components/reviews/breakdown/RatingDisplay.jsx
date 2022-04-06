import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RatingDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating
    }
  }

  render() {
    return (
      <div className="reviews-breakdown-rating">
        <h2 className="breakdown-rating-num">
          5
        </h2>
        <div className="breakdown-rating-stars">
          star1 star2 star3 star4 star5
        </div>
      </div>
    );
  }
}

//PROPS
RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired
};

export default RatingDisplay;
