import React from 'react';
import PropTypes from 'prop-types';

const IndividualReviewImages = props => (
  <div className="individual-reviews-images">
    {props.imagesUrl.map((urlObj) => (
      <img key={urlObj.id} src={urlObj.url} alt="Image of Product" className="review-photo" width="100%" height="75px"/>
    ))}
  </div>
);

// const IndividualReviewImages = props => {
//   console.log(props.imagesUrl);
// }

IndividualReviewImages.propTypes = {
  imagesUrl: PropTypes.array
};

export default IndividualReviewImages;