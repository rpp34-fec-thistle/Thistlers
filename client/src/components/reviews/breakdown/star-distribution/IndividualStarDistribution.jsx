import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IndividualStar extends Component {
  constructor(props) {
    super(props);
    this.percentage = Math.floor(parseInt(this.props.value) / this.props.total * 100);
  }

  componentDidUpdate() {
    // console.log(this.props);
    let starBar = document.querySelector(`.star-bar-${this.props.keyVal}`);
    // console.log(this.percentage);
    starBar.style.width = `${this.percentage}%`;
  }

  render() {
    return (
      <div className="individual-star-container">
        <div className="star-sort-link">{this.props.keyVal} Stars</div> 
        <div className="star-bar-container">
          <div className={`star-bar star-bar-${this.props.keyVal}`}></div>
        </div>
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