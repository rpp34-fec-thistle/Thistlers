import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReviewCount from './ReviewCount.jsx';
import ReviewList from './reviewList/ReviewList.jsx';
import ReviewInteractions from './ReviewInteractions.jsx';

class CustomerReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews,
      totalReviews: this.props.totalReviews,
      refresh: this.props.refresh
    }
  }

  render() {
    return (
      <div className="customer-reviews">
          this is the customer reviews portion!
          <ReviewCount totalReviews={this.state.totalReviews}/>
          <ReviewList reviews={this.props.reviews}/>
          <ReviewInteractions refresh={this.props.refresh}/>
      </div>
    );
  }
}

//PROPS
CustomerReviews.propTypes = {
  reviews: PropTypes.array,
  totalReviews: PropTypes.number,
  refresh: PropTypes.func
};

export default CustomerReviews;

