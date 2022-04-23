import React from 'react';
import PropTypes from 'prop-types';

function StyleThumbnail(props) {
  let handleClick = () => {
    props.updateStyle(props.imageindex)
  }
  let pageElement = <></>
  if (props.imageindex === props.currentStyle) {
    pageElement = (
      <div className="selected-tn-container">
        <img onClick={handleClick} className="selected-style-tn" src={props.image}></img>
        <span className="check">✔️</span>
      </div>
    )
  } else {
    pageElement = (
      <img onClick={handleClick} className="style-tn" src={props.image}></img>
    )
  }
    return(
      pageElement
    )
}

StyleThumbnail.propTypes = {
  image: PropTypes.string,
  updateStyle: PropTypes.func,
  imageindex: PropTypes.number,
  currentStyle: PropTypes.number
}

export default StyleThumbnail;