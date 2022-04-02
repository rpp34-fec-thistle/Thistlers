import React, {Component} from 'react';
import IndividualStar from './IndividualStarDistribution.jsx';

class StarDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starData: [1,2,3,4,5]
    }
  }

  render() {
    return (
      <div>
        {this.state.starData.map(starData => (
          <IndividualStar key="" data={starData} />
        ))}
      </div>
    );
  }
}

export default StarDistribution;