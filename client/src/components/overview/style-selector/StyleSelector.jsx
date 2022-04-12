import React from 'react';
import PropTypes from 'prop-types';

import SelectedStyle from './components/SelectedStyle.jsx';
import AllStyleThumbnails from './components/AllStyleThumbnails.jsx';

function StyleSelector(props) {
    return(
      <div className="style-selector">
        <SelectedStyle styleName={props.styles[props.styleIndex]?.name}/>
        <AllStyleThumbnails currentStyle={props.styleIndex} updateStyle={props.updateStyle} data={props.styles}/>
      </div>
    )
}

StyleSelector.propTypes = {
  styles: PropTypes.array,
  styleIndex: PropTypes.number,
  updateStyle: PropTypes.func
}

export default StyleSelector;