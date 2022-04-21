import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RatingDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var ratingNum = parseFloat(this.props.rating);
    var ratingArr = [];
    while (ratingNum > 0) {
      ratingArr.push(1);
      ratingNum--
      if (ratingNum < 1 && ratingNum !== 0) {
        ratingArr.push(parseFloat(ratingNum.toString().slice(0, 4)));
        ratingNum = 0;
      }
    }
    console.log(ratingArr);

    return (
      <div className="reviews-breakdown-rating">
        <h2 className="breakdown-rating-num">
          {this.props.rating}
        </h2>
        <div className="breakdown-rating-stars">
          {ratingArr.map(rating => {
            return (
              <span className="rating" key={rating + Math.random()*1000}> {rating} </span>
            )
          })}
        </div>
      </div>
    );
  }
}

//PROPS
RatingDisplay.propTypes = {
  rating: PropTypes.string
};

export default RatingDisplay;
