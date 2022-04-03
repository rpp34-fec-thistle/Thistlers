import React, {Component} from 'react';

class ReviewInteractions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reviews-reviews-interactions">
        <button className="btn-more-reviews btn-r-int">More Reviews +</button>
        <button className="btn-add-review btn-r-int">Add Review +</button>
      </div>
    )
  }
}

export default ReviewInteractions;