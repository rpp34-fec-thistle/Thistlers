import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
          Review list!
      </div>
    )
  }
}

//PROPS
ReviewList.propTypes = {
  reviews: PropTypes.object.isRequired
};

export default ReviewList;
