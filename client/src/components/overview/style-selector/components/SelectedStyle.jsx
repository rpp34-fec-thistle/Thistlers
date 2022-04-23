import React from 'react';
import PropTypes from 'prop-types';

function SelectedStyle(props) {
    return(
      <div className="selected-style">
        <h4>STYLE {'>'} {props.styleName}</h4>
      </div>
    )
}

SelectedStyle.propTypes = {
  styleName: PropTypes.string
}

export default SelectedStyle;