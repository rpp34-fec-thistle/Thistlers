import React from 'react';
import PropTypes from 'prop-types';

function StyleThumbnail(props) {
  let handleClick = () => {
    console.log({index: props.imageindex})
  }
    return(
        <img onClick={handleClick} className="style-tn" src={props.image}></img>
    )
}

StyleThumbnail.propTypes = {
  image: PropTypes.string,
  updateStyle: PropTypes.func,
  imageindex: PropTypes.number
}

export default StyleThumbnail;