import React from 'react';
import PropTypes from 'prop-types';

import ImageThumbnail from './ImageThumbnail.jsx';

function AllImagesThumbnails(props) {
    let pageElement;
    if (props.thumbnails === undefined) {
     pageElement = (
     <div className="all-image-tns">
       <p>AllImagesThumbnails [Placeholder]</p>
     </div>
     )
    } else {
      pageElement = (
      <div className="all-image-tns">
        {props.thumbnails.map((tn, index) => {
          let key = tn.split('-')[1];
          return (<ImageThumbnail
          image_index={index}
          imageId={key}
          selectedPhoto={props.selectedPhoto}
          currentImage={props.currentImage}
          key={key}
          thumbnail={tn}/>)
        })}
      </div>
      )
    }
    return (
      pageElement
    )

}

AllImagesThumbnails.propTypes = {
  thumbnails: PropTypes.array,
  currentImage: PropTypes.string,
  selectedPhoto: PropTypes.func
}

export default AllImagesThumbnails;