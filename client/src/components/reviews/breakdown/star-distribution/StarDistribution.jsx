import React, {Component} from 'react';
import IndividualStar from './IndividualStarDistribution.jsx';
import PropTypes from 'prop-types';

class StarDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: this.props.metadata,
      starData: [1,2,3,4,5] //USE META DATA LATER ON!
    }
  }

  render() {
    return (
      <div className="reviews-breakdown-star-distribution">
        {this.state.starData.map((starData, i) => (
          <IndividualStar key={`individual-star-${i}`} data={starData} starData={'INSERT_STARDATA'} />
        ))}
      </div>
    );
  }
}

//PROPS
StarDistribution.propTypes = {
  metadata: PropTypes.object
};

export default StarDistribution;