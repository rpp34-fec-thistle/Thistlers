import React, {Component} from 'react';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: props.recommend
    };
  }

  render() {
    if (this.state.recommend) {
      return (
        <div className="reviews-breakdown-recommendation">
          100% OF CUSTOMERS RECCOMEND THIS PRODUCT!
        </div>
      );
    }

    return (
      <div className="reviews-breakdown-recommendation"></div>
    );
  }
}

Recommendation.propTypes = {
  recommend: null
}

export default Recommendation;
