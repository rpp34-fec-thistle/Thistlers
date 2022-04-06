import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: true || props.recommend
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

//PROPS
Recommendation.propTypes = {
  recommend: PropTypes.number
}

export default Recommendation;
