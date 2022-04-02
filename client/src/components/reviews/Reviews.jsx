import React, {Component} from 'react';
import Breakdown from './breakdown/Breakdown.jsx';
import CustomerReviews from './customerReviews/CustomerReviews.jsx';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //empty for now!
    }
  }

  render() {
    return (
      <section className="reviews-container">
        <h1 className="reviews-title">Ratings & Reviews</h1>
        <div className="reviews">
          <Breakdown />
          <CustomerReviews />
        </div>
      </section>
    );
  }
}

export default Reviews;