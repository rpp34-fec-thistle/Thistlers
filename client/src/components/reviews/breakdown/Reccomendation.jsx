import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.getRecommendPercentage = this.getRecommendPercentage.bind(this);
  }

  render() {
      return (
        <div className="reviews-breakdown-recommendation">
          {this.getRecommendPercentage()}
        </div>
      );

  }

  getRecommendPercentage() {
    if (this.props.metadata.recommended !== undefined) {
      var recommends = this.props.metadata.recommended.true;
      var total = parseInt(recommends) + parseInt(this.props.metadata.recommended.false);
      return `${Math.floor(recommends/ total * 100)}% Recommend this Product!`;
    } else {
      return 'Retrieving Recommendations %';
    }
  }
}

//PROPS
Recommendation.propTypes = {
  metadata: PropTypes.object
}

export default Recommendation;
