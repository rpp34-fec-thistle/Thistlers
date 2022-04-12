import React from 'react';
import PropTypes from 'prop-types';

import SelectedStyle from './components/SelectedStyle.jsx';
import AllStyleThumbnails from './components/AllStyleThumbnails.jsx';

function StyleSelector(props) {
  let updateStyle = (styleIndex) => {
    console.log({styleIndex})
  }
    return(
      <div className="style-selector">
        <SelectedStyle styleName={props.styles[props.styleIndex]?.name}/>
        <AllStyleThumbnails updateStyle={updateStyle} data={props.styles[props.styleIndex]}/>
      </div>
    )
}

StyleSelector.propTypes = {
  styles: PropTypes.array,
  styleIndex: PropTypes.number
}

export default StyleSelector;