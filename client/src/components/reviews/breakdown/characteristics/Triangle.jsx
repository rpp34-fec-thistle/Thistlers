import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Triangle extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log("avg", this.props.average);
    if (this.props.average) {
      var percentage = Math.floor(parseFloat(this.props.average) / 5 * 100);
      document.querySelector(`.triangle-box-${this.props.id}`).style.left = `calc(${percentage}% - 10px)`;
    }
  }

  render() {
    return (
      <div className={`triangle-box triangle-box-${this.props.id}`}>
        <div className="triangle"></div>
      </div>
    );
  }
}

Triangle.propTypes = {
  average: PropTypes.string,
  id: PropTypes.number
};

export default Triangle;