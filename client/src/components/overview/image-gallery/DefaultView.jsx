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
      <div style={{'border-style': 'solid', 'margin': '10px'}}>
        <h5>DefaultView [Placeholder] </h5>
        <div style={{'border-style': 'solid', 'margin': '10px'}}>
          Selected Image
          <AllImagesThumbnails/>
          </div>

      </div>
    )
  }
}

export default DefaultView;