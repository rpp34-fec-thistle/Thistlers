import React, {Component} from 'react';
import IndividualStar from './IndividualStarDistribution.jsx';
import PropTypes from 'prop-types';

class StarDistribution extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.metadata.ratings === undefined) {
      return <div>RETRIEVING RATINGS!</div>
    }
    return (
      <div className="reviews-breakdown-star-distribution">
        {Object.keys(this.props.metadata.ratings).map(rating => {
          return <IndividualStar key = {rating} keyVal = {rating} value = {this.props.metadata.ratings[rating]} total = {this.getTotalRatings(this.props.metadata.ratings)}/>
        })}
      </div>
    );
  }

  getTotalRatings(ratings) {
    var sum = 0;
    for (var x in ratings) {
      sum += parseInt(ratings[x]);
    }
    return sum;
  }
}

//PROPS
StarDistribution.propTypes = {
  metadata: PropTypes.object
};

export default StarDistribution;