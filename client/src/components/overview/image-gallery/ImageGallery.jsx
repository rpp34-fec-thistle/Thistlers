import React from 'react';
import PropTypes from 'prop-types';

import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';

function ImageGallery(props) {
    let view;
    if(props.view === 'default') {
      view = <DefaultView styleIndex={props.styleIndex} styles={props.stylesData}/>;
    }
    if(props.view === 'expanded') {
      view = <ExpandedView />;
    }
    return (
      <div data-testid="image-gallery" className="image-gallery">
        {view}
      </div>
    )
}

ImageGallery.propTypes = {
  view: PropTypes.string,
  stylesData: PropTypes.array,
  styleIndex: PropTypes.number
}

export default ImageGallery;