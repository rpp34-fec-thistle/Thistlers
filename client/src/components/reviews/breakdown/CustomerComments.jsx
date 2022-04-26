import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomerComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: this.props.characteristics,
    };
    console.log(this.state.characteristics);
  }

  render() {
    return <div>
      
    </div>
  }
}

//PROPS
CustomerComments.propTypes = {
  characteristics: PropTypes.object
};

export default CustomerComments;
