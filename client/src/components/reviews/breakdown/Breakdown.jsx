import React, {Component} from 'react';
import RatingDisplay from './RatingDisplay.jsx';
import Recommendation from './Reccomendation.jsx';
import StarDistribution from './star-distribution/StarDistribution.jsx';
import CustomerComments from './CustomerComments.jsx';

class Breakdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reviews-breakdown">
        <RatingDisplay />
        <Recommendation recommend={true /*TEST CHANGE LASTER!*/}/>
        <StarDistribution />
        <CustomerComments />
      </div>
    );
  }
}

export default Breakdown;