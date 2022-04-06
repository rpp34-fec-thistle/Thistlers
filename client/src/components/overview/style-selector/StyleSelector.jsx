import React from 'react';

import SelectedStyle from './components/SelectedStyle.jsx';
import AllStyleThumbnails from './components/AllStyleThumbnails.jsx';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}
  }

  render() {
    return(
      <div className="style-selector">
        <SelectedStyle/>
        <AllStyleThumbnails/>
      </div>
    )
  }
}

export default StyleSelector;