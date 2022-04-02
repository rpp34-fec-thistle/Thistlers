import React from 'react';

import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let view;

    if(this.props.view === 'default') {
      view = <DefaultView />;
    }
    if(this.props.view === 'expanded') {
      view = <ExpandedView />;
    }
    return (
      <div className="image-gallery">
        <h4>Image Gallery [Placeholder]</h4>
        {view}
      </div>
    )
  }
}

export default ImageGallery;