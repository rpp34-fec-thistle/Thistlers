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
    }
  }

  render() {
    return (
      <div className="reviews-breakdown">
        <RatingDisplay rating={5}/>
        <Recommendation metadata={this.props.metadata}/>
        <StarDistribution metadata={this.state.metadata}/>
        <CustomerComments metadata={this.state.metadata.characteristics}/>
      </div>
    );
  }
}

//PROPS
Breakdown.propTypes = {
  metadata: PropTypes.object,
}

export default Breakdown;