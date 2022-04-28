import React, {Component} from 'react';
import Characteristic from './characteristics/Characteristics.jsx';
import PropTypes from 'prop-types';

class CustomerComments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let characteristicsArr;

    if (this.props.metadata.characteristics) {
      characteristicsArr = Object.keys(this.props.metadata.characteristics);
    } else  {
      characteristicsArr = [];
    }

    return (
      <div className="characteristics">
        {characteristicsArr.map((characteristic, i) => {
          if (characteristic === 'Quality') {
            return <Characteristic id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Poor", "Average", "Perfect"]}/>;
          } else if (characteristic === 'Size') {
            return <Characteristic id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Too small", "Perfect", "Too large"]}/>;
          } else if (characteristic === "Width") {
            return <Characteristic id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Too Narrow", "Perfect", "Too Wide"]}/>;
          } else if (characteristic === "Comfort") {
            return <Characteristic id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Uncomfortable", "Comfortable", "Perfect"]}/>;
          } else if (characteristic === "Length") {
            return <Characteristic id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Runs Short", "Perfect", "Runs Long"]}/>;
          } else if (characteristic === "Fit") {
            return <Characteristic id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Runs Tight", "Perfect", "Runs Long"]}/>;
          }
        })}
      </div>
    )
  }
}

//PROPS
CustomerComments.propTypes = {
  metadata: PropTypes.object
};

export default CustomerComments;
