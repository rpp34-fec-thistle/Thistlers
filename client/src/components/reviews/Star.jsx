import React from "react";
import PropTypes from 'prop-types';

const Star = props => {
  let float = parseFloat(props.starVal);
  if ( float <= .25) {
    return <img width="14px" height="14px" src={'/quarter-star.png'} alt="x" />
  } else if (float <= .5) {
    return <img width="14px" height="14px" src={'/half-star.png'} alt="x" />
  } else if (float <= .75) {
    return <img width="14px" height="14px" src={'/3quarter-star.png'} alt="x" />
  } else {
    return <img width="14px" height="14px" src={'/full-star-1.png'} alt="x" />
  }
};

Star.propTypes = {
  starVal: PropTypes.number
};

export default Star;