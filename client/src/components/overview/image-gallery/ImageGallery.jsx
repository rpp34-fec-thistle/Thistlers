import React from 'react';
import PropTypes from 'prop-types';

import DefaultView from './DefaultView.jsx';
import FullScreenImage from './svg-icons/fullscreen.svg';
import FullScreenExitImage from './svg-icons/fullscreen-exit.svg';


function ImageGallery(props) {
    let view;
    view = (
      <DefaultView
      currentView={props.view}
      styleIndex={props.styleIndex}
      styles={props.stylesData}/>
    );
    let changeView = () => {
      props.changeView()
    }
    let screenImage;

    if (props.view === 'default') {
      screenImage = FullScreenImage
    } else {
      screenImage = FullScreenExitImage
    }
    return (
      <div data-testid="image-gallery" className="image-gallery">
        <img
        alt="full-screen-icon"
        onClick={changeView}
        className="full-screen"
        src={screenImage}></img>
        {view}
      </div>
    )
}

ImageGallery.propTypes = {
  view: PropTypes.string,
  stylesData: PropTypes.array,
  styleIndex: PropTypes.number,
  changeView: PropTypes.func
}

export default ImageGallery;