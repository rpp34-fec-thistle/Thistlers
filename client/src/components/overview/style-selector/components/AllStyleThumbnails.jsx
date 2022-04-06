import React from 'react';

import StyleThumbnail from './StyleThumbnail.jsx';

class AllStyleThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div className="all-styles-tn">
        AllStyleThumbnails [Placeholder]
        <StyleThumbnail/>
      </div>
    )
  }
}

export default AllStyleThumbnails;