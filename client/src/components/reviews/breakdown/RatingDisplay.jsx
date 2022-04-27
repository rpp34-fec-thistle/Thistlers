import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from '../Star.jsx';

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

    return (
      <div className="reviews-breakdown-rating">
        <h2 className="breakdown-rating-num">
          {padNumber(this.props.rating)}
        </h2>

        <div className="review-breakdown-stars-container">
          <div className="breakdown-rating-stars">
            {ratingArr.map(rating => {
              return (
                <Star key={Math.floor(Math.random()* 100000)} starVal={rating}/>
              )
            })}
          </div>
          <div className="stars-filler"></div>
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
