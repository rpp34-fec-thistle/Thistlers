import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Triangle extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.average !== undefined) {
      var percentage = Math.floor(parseFloat(this.props.average) / 5 * 100);
      document.querySelector(`.triangle-box-${this.props.id}`).style.left = `calc(${percentage}% - 10px)`;
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) return;
    if (this.props.average !== undefined) {
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