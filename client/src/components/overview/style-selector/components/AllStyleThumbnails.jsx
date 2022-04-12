import React from 'react';
import PropTypes from 'prop-types';

import StyleThumbnail from './StyleThumbnail.jsx';

function AllStyleThumbnails(props) {
  let comp = <></>;
  if(props.data) {
    comp = (
      <div className="all-styles-tn">
      {props.data.photos.map((img,index) => (
      <StyleThumbnail imageindex={index} key={`img-${index}`} image={img.thumbnail_url}/>
      ))}
      </div>
    )
  }
    return(comp)
}

AllStyleThumbnails.propTypes = {
  data: PropTypes.object,
  updateStyle: PropTypes.func
}

export default AllStyleThumbnails;