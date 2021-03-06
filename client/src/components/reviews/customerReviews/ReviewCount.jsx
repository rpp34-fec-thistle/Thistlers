import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ReviewCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: this.props.totalReviews
    }
  }

  onSelectChange(option) {
    this.props.changeSort(option);
  }

  render() {
    return (
      <div className="review-count">
        <span className="total-reviews">
          {this.props.totalReviews} reviews sorted by,  
        </span>
        <span className="sort-by">
          <select name="sorted-by" id="sort-by" onChange={e => this.onSelectChange.call(this, e.target.value)}>
          <option value="relevant">relevance</option>
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
  totalReviews: PropTypes.number,
  changeSort: PropTypes.func
};

export default ReviewCount;