import React, {Component} from 'react';
import Breakdown from './breakdown/Breakdown.jsx';
import CustomerReviews from './customerReviews/CustomerReviews.jsx';
import PropTypes from 'prop-types';

class Reviews extends Component {
  constructor(props) {
    super(props);
    // PROPS SHOULD HAVE props.product_id or SIMILAR!
    this.state = {
      productId: 1 || this.props.productId,
      reviews: [{}, {}, {}],
      metadata: {char: {}, this: {}, that: {}},
      overallRating: 3, // does not come with api
      recomend: 2 //does not come with api 
    }
    this.refresh(this.state.productId);
  }

  render() {
    return (
      <section className="reviews-container">
        <h1 className="reviews-title">Ratings & Reviews</h1>
        <div className="reviews">
          <Breakdown metadata={this.state.metadata} rating={this.state.overallRating} recomend={this.state.recomend/ this.state.reviews.length}/>
          <CustomerReviews reviews={this.state.reviews} totalReviews={this.state.reviews.length} refresh={() => this.refresh.call(this, this.state.productId)}/>
        </div>
      </section>
    );
  }

  refresh(id) {
    console.log(id);
    // CALL THE PARSE FUNCTIONS
  }

  parseReviewsInfo(id) {
    console.log(id);
    /*
    GET ALL REVIEWS
    | SELECT DATA FROM REVIEWS THAT HAVE THE PRODUCT ID
      | ADD THOSE TO AN ARRAY
        | GET MEAN OF REVIEWS FROM ARRAY ^
        | GET # OF RECCOMENDS
          | WHEN DONE: SET STATE: REVIEWS: [...], overallRating: 3, reccomend: 5/ REVIEWS.length
    */
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