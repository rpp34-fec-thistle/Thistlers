import React, {Component} from 'react';
import ReviewCount from './ReviewCount.jsx';
import ReviewList from './reviewList/ReviewList.jsx';
import ReviewInteractions from './ReviewInteractions.jsx';

class CustomerReviews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="customer-reviews">
          <ReviewCount />
          <ReviewList />
          <hr />
          <ReviewInteractions />
      </div>
    );
  }
}

export default CustomerReviews;

