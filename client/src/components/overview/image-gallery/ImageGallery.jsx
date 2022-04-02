import React from 'react';

import DefaultView from './DefaultView.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="image-gallery">
        <h4>Image Gallery [Placeholder]</h4>
        <DefaultView />
      </div>
    )
  }
}

export default ImageGallery;