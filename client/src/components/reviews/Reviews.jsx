import React, {Component} from 'react';
import Breakdown from './breakdown/Breakdown.jsx';
import CustomerReviews from './customerReviews/CustomerReviews.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

class Reviews extends Component {
  constructor(props) {
    super(props);
    // PROPS SHOULD HAVE props.product_id or SIMILAR!
    this.state = {
      productId: this.props.product_id,
      reviews: [],
      metadata: {},
    }
    // this.refresh(this.state.productId);
    this.parseReviewsMetaInfo(this.state.productId);
    this.parseReviewsInfo(this.state.productId);
  }

  render() {
    return (
      <section className="reviews-container">
        <h1 className="reviews-title">RATINGS & REVIEWS</h1>
        <div className="reviews">
          <Breakdown metadata={this.state.metadata}/>
          <CustomerReviews productId={this.props.product_id} metadata = {this.state.metadata} reviews={this.state.reviews} totalReviews={this.state.reviews.length} refresh={() => this.refresh.call(this, this.state.productId)}/>
        </div>
        </section>
    );
  }

  parseReviewsMetaInfo(id) {
    axios({
      method: 'get',
      url: `/reviews/${id}`,
    })
    .then(res => {
      this.setState({metadata: res.data});
    })
    .catch(err => {
      console.log('err: ', err);
    });
  }

  parseReviewsInfo(id) {
    axios({
      method: 'get',
      url: `/reviews-meta/${id}`
    })
    .then(res => {
      this.setState({reviews: res.data.results});
    })
    .catch(err => {
      console.log('err: ', err);
    });
  }
}

//PROPS
Reviews.propTypes = {
  product_id: PropTypes.number
};

export default Reviews;