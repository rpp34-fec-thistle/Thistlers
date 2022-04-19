import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IndividualStar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var percentage = Math.floor(parseInt(this.props.value) / this.props.total * 100);
    return (
      <div>
        {`${this.props.keyVal}: ${this.props.value}`}
        <br />
        Percentage: {percentage}
      </div>
    )
  }
}

//PROPS
IndividualStar.propTypes = {
  keyVal: PropTypes.string,
  value: PropTypes.string,
  total: PropTypes.number
};

export default IndividualStar;