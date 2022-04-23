import React from "react";
import PropTypes from 'prop-types';

const Star = props => {
  if (parseInt(props.starVal) === 1) {
    return <img width="14px" height="14px" src={'/full-star-1.png'} alt="x" />
  }
};

Star.propTypes = {
  starVal: PropTypes.number
};

export default Star;