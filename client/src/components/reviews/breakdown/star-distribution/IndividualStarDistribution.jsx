import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IndividualStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starData: this.props.starData,
      //   HARD CODED! {for testing}
      amtOfReviews: 100,
      totalReviews: 130,
      starNum: 5
    }
  }

  render() {
    return (
      <div className="star-distribution-indiv-star">
        <a href="#" className="indiv-star-name">{this.state.starNum}</a>
        <div className="indiv-star-box">
          <div className={`indiv-star-percentage i-s-p-${this.state.starNum}`}>
            50
          </div>
        </div>
      </div>
    )
  }
}

//PROPS
IndividualStar.propTypes = {
  starData: PropTypes.string
};

export default IndividualStar;