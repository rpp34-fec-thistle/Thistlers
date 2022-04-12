import React from 'react';
import PropTypes from 'prop-types';

import StyleThumbnail from './StyleThumbnail.jsx';

function AllStyleThumbnails(props) {
  let comp = <></>;
  if(props.data) {
    comp = (
      <div className="all-styles-tn">
      {props.data.map((img,index) => (
      <StyleThumbnail
        updateStyle={props.updateStyle}
        imageindex={index} key={`img-${index}`}
        image={img.photos[0].thumbnail_url}
        currentStyle={props.currentStyle}
      />
      ))}
      </div>
    )
  }
    return(comp)
}

AllStyleThumbnails.propTypes = {
  data: PropTypes.object,
  updateStyle: PropTypes.func,
  currentStyle: PropTypes.number
}

export default AllStyleThumbnails;