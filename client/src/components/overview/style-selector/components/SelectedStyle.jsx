import React from 'react';
import PropTypes from 'prop-types';

function SelectedStyle(props) {
    return(
        <div className="selected-style">
          <p className="style">STYLE {'>'}</p>
          <p className="style-name">{props.styleName}</p>
        </div>
    )
}

SelectedStyle.propTypes = {
  styleName: PropTypes.string
}

export default SelectedStyle;