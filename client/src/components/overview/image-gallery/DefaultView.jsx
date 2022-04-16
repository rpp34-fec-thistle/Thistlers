import React from 'react';
import PropTypes from 'prop-types';

import AllImagesThumbnails from './default-view-components/AllImagesThumbnails.jsx';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      currentPhoto: '',
      currentStyle: 0
    }

    this.cyclePhotos = this.cyclePhotos.bind(this);
    this.selectedPhoto = this.selectedPhoto.bind(this);
  }

  componentDidMount() {
      let thumbnails = this.props.styles[this.props.styleIndex].photos.map((photo) => {
        return photo.thumbnail_url
      });
      let image_id = this.props.styles[this.props.styleIndex].photos[0].url.split('-')[1];
      this.setState({
        styles: this.props.styles,
        currentPhoto: this.props.styles[this.props.styleIndex].photos[0].url,
        imageIndex: 0,
        currentStyle: this.props.styleIndex,
        thumbnails: thumbnails,
        image_id: image_id
      });
  }

  componentDidUpdate(prevProps) {
    if(this.props.styles !== prevProps.styles || this.props.styleIndex !== prevProps.styleIndex) {
      this.componentDidMount()
    }
  }

  selectedPhoto(selectedIndex) {
    let currentStyleIndex = this.props.styleIndex;
    let selectedPhoto = this.props.styles[currentStyleIndex].photos[selectedIndex]?.url;
    let image_id = selectedPhoto.split('-')[1];
    this.setState({
      imageIndex: selectedIndex,
      currentPhoto: selectedPhoto,
      image_id: image_id
    })
  }

  cyclePhotos(dir) {
    let currentStyleIndex = this.props.styleIndex;
    let photoIndex = this.state.imageIndex;

    if(dir.target.name === 'Next') {
      let nextPhoto = this.props.styles[currentStyleIndex].photos[photoIndex + 1]?.url;
      let image_id = nextPhoto.split('-')[1];

      if (nextPhoto !== undefined) {
        this.setState({
          currentPhoto: nextPhoto,
          imageIndex: photoIndex + 1,
          image_id: image_id
        })
      }
    } else {
      let prevPhoto = this.props.styles[currentStyleIndex].photos[photoIndex - 1]?.url;
      let image_id = prevPhoto.split('-')[1];

      if (prevPhoto !== undefined) {
        this.setState({
          currentPhoto: prevPhoto,
          imageIndex: photoIndex - 1,
          image_id: image_id
        })
      }
    }
  }

  render() {
    return(
      <div data-testid="default-view" className="default-view">
        <img
        className="selected-image"
        src={this.state.currentPhoto}
        alt="s-image">
        </img>
        <div>
        <button onClick={this.cyclePhotos} name="Prev">Prev</button>
        <button onClick={this.cyclePhotos} name="Next">Next</button>
        </div>
        <AllImagesThumbnails
          thumbnails={this.state.thumbnails}
          currentImage={this.state.image_id}
          selectedPhoto={this.selectedPhoto}
        />
      </div>
    )
  }
}

DefaultView.propTypes = {
  styles: PropTypes.array,
  styleIndex: PropTypes.number
}



export default DefaultView;