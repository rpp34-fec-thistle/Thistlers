import React from 'react';
import PropTypes from 'prop-types';

function Info(props) {
    return(
      <div className="info">
        {props.info.category}
        <h4>{props.info.name}</h4>
        <p>{props.info.price}</p>
      </div>
    )
}

Info.propTypes ={
  info: PropTypes.object
}

export default Info;