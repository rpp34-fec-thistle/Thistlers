import React, {Component} from 'react';
import Characteristic from './characteristics/Characteristics.jsx';
import PropTypes from 'prop-types';

class CustomerComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristicsArr: []
    }
  }
  

  componentDidMount() {
    let characteristicsArr;
    if (this.props.metadata.characteristics) {
      characteristicsArr = Object.keys(this.props.metadata.characteristics);
    } else  {
      characteristicsArr = [];
    }
    characteristicsArr.forEach(char => this.props.metadata.characteristics[char].value = this.props.metadata.characteristics[char].value.slice(0, 4));
    this.setState({characteristicsArr});
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) return;
    let characteristicsArr;
    if (this.props.metadata.characteristics) {
      characteristicsArr = Object.keys(this.props.metadata.characteristics);
    } else  {
      characteristicsArr = [];
    }
    characteristicsArr.forEach(char => this.props.metadata.characteristics[char].value = this.props.metadata.characteristics[char].value.slice(0, 4));
    this.setState({characteristicsArr});
  }

  render() {
    return (
      <div className="characteristics">
        {this.state.characteristicsArr.map((characteristic, i) => {
          try {
            if (characteristic === 'Quality') {
              return <Characteristic key={characteristic} id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Poor", "Average", "Perfect"]}/>;
            } else if (characteristic === 'Size') {
              return <Characteristic key={characteristic} id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Too small", "Perfect", "Too large"]}/>;
            } else if (characteristic === "Width") {
              return <Characteristic key={characteristic} id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Too Narrow", "Perfect", "Too Wide"]}/>;
            } else if (characteristic === "Comfort") {
              return <Characteristic key={characteristic} id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Uncomfortable", "Comfortable", "Perfect"]}/>;
            } else if (characteristic === "Length") {
              return <Characteristic key={characteristic} id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Runs Short", "Perfect", "Runs Long"]}/>;
            } else if (characteristic === "Fit") {
              return <Characteristic key={characteristic} id={i} title={characteristic} value={this.props.metadata.characteristics[characteristic].value} text={["Runs Tight", "Perfect", "Runs Long"]}/>;
            }
          } catch {return}
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
