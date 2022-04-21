import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NewReviewModle from './AddReviewModle.jsx';

class ReviewInteractions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: this.props.refresh,
      newReviewModle: false
    }
  }

  render() {
    return (
      <div className="review-interactions">
        review Interactions!
        <button className="more-reviews">more reviews</button>
        <button onClick = {() => this.toggleReviewModle.call(this)} className="add-review">add review</button>
        <NewReviewModle productId={this.props.productId} metadata={this.props.metadata} toggleModle = {() => this.toggleReviewModle.call(this)} render = {this.state.newReviewModle}/>
      </div>
    );
  }

  toggleReviewModle() {
    this.setState({
      newReviewModle: !this.state.newReviewModle
    });
  }
}

//PROPS
ReviewInteractions.propTypes = {
  refresh: PropTypes.func,
  metadata: PropTypes.object,
  productId: PropTypes.number
};

export default ReviewInteractions;