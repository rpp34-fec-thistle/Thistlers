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
          {padNumber(this.props.rating)}
        </h2>

        <div className="review-breakdown-stars-container">
          <div className="breakdown-rating-stars">
            {ratingArr.map(rating => {
              return (
                <span className="rating" key={rating + Math.random()*1000}> {rating} </span>
              )
            })}
          </div>
          <div className="stars-filler">x</div>
        </div>
      </div>
    );
  }
}

const padNumber = num => {
  return num.toString().slice(0, 3);
}

//PROPS
RatingDisplay.propTypes = {
  rating: PropTypes.string
};

export default RatingDisplay;
