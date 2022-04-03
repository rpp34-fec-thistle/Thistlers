import React, {Component} from 'react';
import IndividualStar from './IndividualReview.jsx';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [1,2,3,4],
      displayedReviews: [1,2]
    }
  }

  render() {
    if (this.state.reviewList.length <= 0) {
      return (
        <div className="reviews-review-list"></div>
      )
    }

    return (
      <div className="reviews-reviews-list">
        {this.state.displayedReviews.map(review => (
          <IndividualStar key="" review={review} />
        ))}
      </div>
    )
  }
}

export default ReviewList;