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
      <section className="reviews">
        <h1>Ratings & Reviews</h1>
        <div className="reviews-main">
          <Breakdown />
          <CustomerReviews />
        </div>
      </section>
    );
  }
}

export default Reviews;