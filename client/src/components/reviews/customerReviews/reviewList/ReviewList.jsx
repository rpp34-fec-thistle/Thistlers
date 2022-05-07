import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IndividualReview from './IndividualReview.jsx';
import FullScreenImageModal from '../FullScreenImageModel.jsx';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fsModalOn: false,
      fsUrl: '#'
    };
    this.toggleFsModle = this.toggleFsModle.bind(this);
  }

  toggleFsModle(url = this.state.fsUrl) {
    this.setState({
      fsModalOn: !this.state.fsModalOn,
      fsUrl: url
    });
  }

  render() {
    return (
      <div className="review-list">
        {this.props.reviews.map(review => {
          return <IndividualReview key={JSON.stringify(review)} review={review} toggleFs={this.toggleFsModle}/>
        })}
        <FullScreenImageModal modalOn={this.state.fsModalOn} toggle={this.toggleFsModle} url={this.state.fsUrl}/>
      </div>
    );
  }
}

//PROPS
ReviewList.propTypes = {
  reviews: PropTypes.array
};

export default ReviewList;
