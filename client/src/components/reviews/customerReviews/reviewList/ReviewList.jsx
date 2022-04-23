import React from 'react';
import PropTypes from 'prop-types';
import IndividualReview from './IndividualReview.jsx';

const ReviewList = props => {
  return (
    <div className="review-list">
      {props.reviews.map(review => {
        return <IndividualReview key={JSON.stringify(review)} review={review}/>
      })}
    </div>
  );
}

//PROPS
ReviewList.propTypes = {
  reviews: PropTypes.array
};

export default ReviewList;
