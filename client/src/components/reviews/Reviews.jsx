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
      productId: 64621 || this.props.productId,
      reviews: [],
      metadata: {},
    }
    // this.refresh(this.state.productId);
    this.parseReviewsInfo(this.state.productId);
  }

  render() {
    return (
      <section className="reviews-container">
        <h1 className="reviews-title">Ratings & Reviews</h1>
        <div className="reviews">
          <Breakdown metadata={this.state.metadata}/>
          <CustomerReviews reviews={this.state.reviews} totalReviews={this.state.reviews.length} refresh={() => this.refresh.call(this, this.state.productId)}/>
        </div>
        {/* Reviews Uncomment here and Comment code above for Testing */}
        </section>
    );
  }

  refresh(id) {
    console.log(id);
  }

  parseReviewsInfo(id) {
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

  parseReviewsMetaInfo(id) {
    console.log(id);
    /*  
    GET ALL REVIEWS META DATA
    | SELECT METADATA WHICH HAVE THE SAME PRODUCT ID
      | ADD THE METADATA TO AN ARRAY
        | SET STATE [...] (METADATA)
    */
  }
}

//PROPS
Reviews.propTypes = {
  productId: PropTypes.number
};

export default Reviews;