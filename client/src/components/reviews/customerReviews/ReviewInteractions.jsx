import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ReviewInteractions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: this.props.refresh
    }
  }

  render() {
    return (
      <div className="review-interactions">
        review Interactions!
        <button className="more-reviews">more reviews</button>
        <button className="add-review">add review</button>
      </div>
    );
  }
}

//PROPS
ReviewInteractions.propTypes = {
  refresh: PropTypes.func.isRequired
};

export default ReviewInteractions;