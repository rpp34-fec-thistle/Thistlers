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
      <div style={{'border-style': 'dashed', 'margin': '10px'}}>
        <p>AllImagesThumbnails [Placeholder]</p>
        <ImageThumbnail/>
      </div>
    )
  }
}

export default AllImagesThumbnails;