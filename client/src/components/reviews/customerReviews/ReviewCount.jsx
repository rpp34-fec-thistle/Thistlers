import React, {Component} from 'react';

class ReviewCount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="total-reviews-and-sort-container">
        <span className="total-reviews">248 Reviews, sorted by </span>
        <span className="reviews-sort-container">
          <select name="" id="" className="reviews-sort-options">
          <option value="relevance" className="reviews-sort-option">relevance</option>
          <option value="newest" className="reviews-sort-option">newest</option>
          <option value="helpful" className="reviews-sort-option">helpful</option>
          </select>
        </span>
      </div>
    );
  }
}

export default ReviewCount;