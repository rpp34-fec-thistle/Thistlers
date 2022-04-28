import React from 'react';
import PropTypes from 'prop-types';

function ImageThumbnail(props) {
  let handleClick = (e) => {
    props.selectedPhoto(+e.target.id[3])
    props.interaction(`${e.target}`, 'Overview', new Date())
  }
    let pageElement;
    if (props.currentImage === props.imageId) {
      pageElement = (
        <div className="selected-tn">
          <img onClick={handleClick}
          id={`tn-${props.image_index}`}
          src={props.thumbnail}
          className="image-tn-selected"
          alt="selected-image-thumbnail"
          ></img>
        </div>

      )
    } else if(props.hidden) {
      pageElement = (
        <img
        src={props.thumbnail}
        className="image-tn-hidden"
        onClick={handleClick}
        id={`tn-${props.image_index}`}
        alt="image-thumbnail"
        ></img>
      )
    } else {
      pageElement = (
        <img
        src={props.thumbnail}
        className="image-tn"
        onClick={handleClick}
        id={`tn-${props.image_index}`}
        alt="image-thumbnail"
        ></img>
      )
    }
    return (
      pageElement
    )
}

ImageThumbnail.propTypes = {
  thumbnail: PropTypes.string,
  currentImage: PropTypes.string,
  imageId: PropTypes.string,
  selectedPhoto: PropTypes.func,
  image_index: PropTypes.number
}

export default ImageThumbnail;