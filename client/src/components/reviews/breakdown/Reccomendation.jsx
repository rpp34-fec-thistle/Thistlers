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
        <div className="review-breakdown-recommendation">
          I RECCOMEND THIS PRODUCT!
        </div>
      );
    }

    return (
      <div className="review-breakdown-recommendation"></div>
    );
  }
}

Recommendation.propTypes = {
  recommend: null
}

export default Recommendation;
