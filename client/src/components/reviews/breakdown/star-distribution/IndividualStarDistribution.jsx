import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IndividualStar extends Component {
  constructor(props) {
    super(props);
    //props: keyval value total
  }

  componentDidMount() {
    try {
      let percentage = Math.floor(parseInt(this.props.value) / parseInt(this.props.total) * 100);
      let starBar = document.querySelector(`.star-bar-${this.props.keyVal}`);
      starBar.style.width = `${percentage}%`;
    } catch {
      null;
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) return;
    let percentage = Math.floor(parseInt(this.props.value) / parseInt(this.props.total) * 100);
    let starBar = document.querySelector(`.star-bar-${this.props.keyVal}`);
    starBar.style.width = `${percentage}%`;
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