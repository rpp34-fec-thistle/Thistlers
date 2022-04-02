import React from 'react';

import ImageThumbnail from './ImageThumbnail.jsx';

class AllImagesThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="all-image-tns">
        <p>AllImagesThumbnails [Placeholder]</p>
        <ImageThumbnail/>
      </div>
    )
  }
}

export default AllImagesThumbnails;