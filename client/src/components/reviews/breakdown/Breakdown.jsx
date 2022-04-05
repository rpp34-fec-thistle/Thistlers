import React, {Component} from 'react';
import RatingDisplay from './RatingDisplay.jsx';
import Recommendation from './Reccomendation.jsx';
import StarDistribution from './star-distribution/StarDistribution.jsx';
import CustomerComments from './CustomerComments.jsx';
import PropTypes from 'prop-types';

class Breakdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: this.props.metadata,
      rating: this.props.rating,
      recommend: this.props.recomend,
    }
  }

  render() {
    return (
      <div className="reviews-breakdown">
        <RatingDisplay rating={this.state.rating}/>
        <Recommendation recommend={this.state.recommend}/>
        <StarDistribution metadata={this.state.metadata}/>
        <CustomerComments metadata={this.state.metadata.characteristics}/>
      </div>
    );
  }
}

//PROPS
Breakdown.propTypes = {
  metadata: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  recomend: PropTypes.number.isRequired,
}

export default Breakdown;