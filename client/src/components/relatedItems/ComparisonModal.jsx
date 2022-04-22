import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class ComparisonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    // this.setComparisonModal = this.setComparisonModal.bind(this);
  }


  // componentDidMount() {

  // }


  render() {

    return (
      <>
        This will be the Comparison Modal.
      </>
    )

  }
}

ComparisonModal.propTypes = {
  id: PropTypes.number
}

export default ComparisonModal;
