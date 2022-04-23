import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReviewCount from './ReviewCount.jsx';
import ReviewList from './reviewList/ReviewList.jsx';
import ReviewInteractions from './ReviewInteractions.jsx';
import axios from 'axios';

// const CustomerReviews = props => {

//   return (
//     <div className="customer-reviews">
//       <ReviewCount totalReviews={props.totalReviews}/>
//       <ReviewList reviews={props.reviews}/>
//       <ReviewInteractions productId={props.productId} metadata={props.metadata}/>
//     </div>
//   );
// };

class CustomerReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      apiFilter: 'relevant',
      reviewsFilter: null
    };

    this.fetchReviews.call(this);
  }

  getTotalReviews() {
    return this.state.reviews.length;
  }

  fetchReviews() {
    axios({
      method: 'post',
      url: '/get-reviews',
      data: {
        id: this.props.productId,
        sort: this.state.apiFilter
      }
    })
    .then(axiosRes => {
      if (this.state.reviewsFilter !== null) {
        var result = [];
        axiosRes.data.results.forEach(review => {
          if (review.rating === this.state.reviewsFilter) {
            result.push(review);
          }
        });
        this.setState({reviews: result});
        return;
      } 

      this.setState({
        reviews: axiosRes.data.results
      });
    })
    .catch(err => {
      console.log('err getting reviews: ', err);
    });
  }

  changeApiFilter(option) {
    this.setState({
      apiFilter: option,
      reviewsFilter: null
    }, () => {
      this.fetchReviews.call(this);
    });
  }

  render() {
    return (
      <div className="customer-reviews">
        <ReviewCount totalReviews={this.getTotalReviews()} changeSort={sort => this.changeApiFilter.call(this, sort)}/>
        <ReviewList reviews={this.state.reviews}/>
        <ReviewInteractions productId={this.props.productId} metadata={this.props.metadata}/>
      </div>
    );
  }
}


//PROPS
CustomerReviews.propTypes = {
  reviews: PropTypes.array,
  totalReviews: PropTypes.number,
  refresh: PropTypes.func,
  metadata: PropTypes.object,
  productId: PropTypes.number
};

export default CustomerReviews;

