import React, {Component} from 'react';
import IndividualStar from './IndividualStarDistribution.jsx';
import PropTypes from 'prop-types';

class StarDistribution extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let totalRatings = this.getTotalRatings(this.props.metadata.ratings);

    if (this.props.metadata.ratings === undefined) {
      return <div>RETRIEVING RATINGS!</div>
    }

    let starsArr = Object.keys(this.props.metadata.ratings);
    let reverseStarsArr = [];
    starsArr.forEach(star => reverseStarsArr.unshift(star));

    return (
      <div className="reviews-breakdown-star-distribution">
        {reverseStarsArr.map((rating, i) => {
          return <IndividualStar key={`rating-${i}`} keyVal={rating} value={this.props.metadata.ratings[rating]} total={totalRatings}/>
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