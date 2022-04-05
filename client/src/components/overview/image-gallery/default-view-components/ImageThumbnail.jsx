import React from 'react';
import PropTypes from 'prop-types';

class ImageThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.selectedPhoto(+e.target.id)
  }

  render() {
    let pageElement;
    if (this.props.currentImage === this.props.imageId) {
      pageElement = (
          <img onClick={this.handleClick}
          id={this.props.image_index}
          src={this.props.thumbnail}
          className="image-tn-selected"
          ></img>
      )
    } else {
      pageElement = (
        <img
        src={this.props.thumbnail}
        className="image-tn"
        onClick={this.handleClick}
        id={this.props.image_index}
        ></img>
      )
    }
    return (
      pageElement
    )
  }
}

ImageThumbnail.propTypes = {
  thumbnail: PropTypes.string,
  currentImage: PropTypes.string,
  imageId: PropTypes.string,
  selectedPhoto: PropTypes.func,
  image_index: PropTypes.number
}

export default ImageThumbnail;