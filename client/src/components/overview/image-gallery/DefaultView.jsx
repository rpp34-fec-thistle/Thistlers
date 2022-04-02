import React from 'react';

import AllImagesThumbnails from './AllImagesThumbnails.jsx';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="default-view">
        <h5>DefaultView [Placeholder] </h5>
        <div className="selected-image">
          Selected Image
          <AllImagesThumbnails/>
          </div>

      </div>
    )
  }
}

export default DefaultView;