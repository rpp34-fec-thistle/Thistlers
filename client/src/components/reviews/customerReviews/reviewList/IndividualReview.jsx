import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const IndividualReview = props => {
  const review = props.review;
  const reviewId = review.review_id;

  return ( 
    <div className="individual-review">
      <div className="review-header">
        <div className="review-stars">{review.rating}</div>

        <div className="review-name-and-date">Test, 03/20/10</div>
      </div>

      <div className="review-subject">
        <div className="review-subject-large-text">{review.summary}</div>

        <div className="review-subject-small-text"></div>
      </div>

      <p className="review-body">{review.body}</p>

      <div className="review-interactions">
        <div className="review-interactions-helpful">
          {/* Helpful? Yes(<span className={`upvote-helpfulness upvote-helpfulness-${reviewId}`} onClick={() => reportHelpful(reviewId)}>{review.helpfulness}</span> <span>)</span> */}
          <span className="helpful-text">Helpful? </span>
          <span className="upvote-helpfulness" onClick={() => reportHelpful(reviewId)}>
          <span className="upvote-text-wrapper">Yes(</span>
          <span className={`upvote-helpfulness-${reviewId}`}>{review.helpfulness}</span>
          <span className="upvote-text-wrapper">)</span>
          </span>
        </div>

        <div className="css-vertical-line"></div>

        <div className={`review-interactions-report downvote-${reviewId}`} onClick={() => reportNegative(reviewId)}>Report</div>
      </div>

      <hr />
    </div>
  );
};

const reportHelpful = (review_id) => {
  var currentVal = document.querySelector(`.upvote-helpfulness-${review_id}`).innerText;
  var nextVal = parseInt(currentVal) + 1;
  
  axios.get(`/review-helpful/${review_id}`)
  .then(() => {
    document.querySelector(`.upvote-helpfulness-${review_id}`).innerText = nextVal;
  })
  .catch(err => {
    console.log('err marking review helpful!', err);
  });
};

const reportNegative = review_id => {
  if (document.querySelector(`.downvote-${review_id}`).innerText === 'Reported!') return;

  axios.get(`/review-report/${review_id}`)
  .then(() => {
    document.querySelector(`.downvote-${review_id}`).innerText = 'Reported!';
    document.querySelector(`.downvote-${review_id}`).style.color = 'indianred';
  })
  .catch(err => {
    console.log('err marking review helpful!', err);
  });
}
 
IndividualReview.propTypes = {
  review: PropTypes.object
};

export default IndividualReview;