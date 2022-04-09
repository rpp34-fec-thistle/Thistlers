import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ReviewCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: this.props.totalReviews
    }
  }

  render() {
    return (
      <div className="review-count">
        <span className="total-reviews">
          248 reviews sorted by,  
        </span>
        <span className="sort-by">
          <select name="sorted-by" id="sort-by">
          <option value="relevance">relevance</option>
          <option value="helpful">helpful</option>
          <option value="newest">newest</option>
          </select>
        </span>
      </div>
    );
  }
}

//PROPS
ReviewCount.propTypes = {
  totalReviews: PropTypes.number
};

export default ReviewCount;