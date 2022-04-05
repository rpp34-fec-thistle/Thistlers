import React from 'react';
import PropTypes from 'prop-types';

import AllImagesThumbnails from './default-view-components/AllImagesThumbnails.jsx';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      currentPhoto: ''
    }

    this.cyclePhotos = this.cyclePhotos.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.styles !== prevProps.styles) {
      this.setState({
        styles: this.props.styles,
        currentPhoto: this.props.styles[0].photos[0].url,
        index: 0,
        currentStyle: 0
      });
    }
  }

  cyclePhotos(dir) {
    if(dir.target.name === 'Next') {
      let currentStyleIndex = this.state.currentStyle;
      let photoIndex = this.state.index;
      let nextPhoto = this.state.styles[currentStyleIndex].photos[photoIndex + 1]?.url;

      if (nextPhoto !== undefined) {
        this.setState({
          currentPhoto: nextPhoto,
          index: photoIndex + 1
        })
      }
    } else {
      let currentStyleIndex = this.state.currentStyle;
      let photoIndex = this.state.index;
      let nextPhoto = this.state.styles[currentStyleIndex].photos[photoIndex - 1]?.url;

      if (nextPhoto !== undefined) {
        this.setState({
          currentPhoto: nextPhoto,
          index: photoIndex - 1
        })
      }
    }
  }

  render() {
    let i = <></>
    if (this.state.styles.length === 0) {
      i = (
      <div className="selected-image">
        Selected Image
        <AllImagesThumbnails/>
      </div>
      )
    } else {
      i = (
      <>
        <img className="selected-image" src={this.state.currentPhoto}></img>
        <button onClick={this.cyclePhotos} name="Next">Next</button>
        <button onClick={this.cyclePhotos} name="Prev">Prev</button>
        <AllImagesThumbnails/>
      </>
      )
    }

    return(
      <div className="default-view">
        <h5>DefaultView [Placeholder] </h5>
          {i}
      </div>
    )
  }
}

DefaultView.propTypes = {
  styles: PropTypes.array,
}



export default DefaultView;