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
        <RatingDisplay rating={this.getAverageRating(this.props.metadata.ratings)}/>
        <Recommendation metadata={this.props.metadata}/>
        <StarDistribution metadata={this.props.metadata}/>
        <CustomerComments metadata={this.props.metadata}/>
      </div>
    );
  }

  getAverageRating(ratings) {
    var sum = 0;
    var ct = 0;
    for (var i in ratings) {
      sum += parseFloat(i) * parseFloat(ratings[i]);
      ct+= parseFloat(ratings[i]);
    }
    return (sum/ct).toString();
  }
}

//PROPS
Breakdown.propTypes = {
  metadata: PropTypes.object,
}

export default Breakdown;