import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IndividualReview from './IndividualReview.jsx';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews
    }
  }

  render() {
    return (
      <div className="review-list">
          {this.props.reviews.map(review => {
            return <IndividualReview key={JSON.stringify(review)}  review={review}/>
          })}
      </div>
    )
  }
}

//PROPS
ReviewList.propTypes = {
  reviews: PropTypes.array
};

export default ReviewList;
