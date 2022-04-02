import React, { Component } from 'react';

class RatingDisplay extends Component {
  constructor(props) {
    super(props);
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

export default RatingDisplay;
