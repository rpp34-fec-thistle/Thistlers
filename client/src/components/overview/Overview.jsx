import React from 'react';

import ImageGallery from './image-gallery/ImageGallery.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default'
    }
  }

  render() {
    return (
      <div style={{'border-style': 'solid'}}>
        <h2>Product Overview [Placeholder]</h2>
        <ImageGallery />
      </div>
    )
  }
}

export default Overview;