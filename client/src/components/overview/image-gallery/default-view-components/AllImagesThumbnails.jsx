import React from 'react';
import PropTypes from 'prop-types';

import ImageThumbnail from './ImageThumbnail.jsx';

class AllImagesThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleThumbnails: this.props.thumbnails
    }

  }

  componentDidUpdate(prevProps) {
    if(this.props.thumbnails !== prevProps.thumbnails) {
      this.setState({
        styleThubnails: this.props.thumbnails
      });
    }
  }

  render() {
    let pageElement;
    if (this.state.styleThumbnails === undefined) {
     pageElement = (
     <div className="all-image-tns">
       <p>AllImagesThumbnails [Placeholder]</p>
     </div>
     )
    } else {
      pageElement = (
      <div className="all-image-tns">
        <p>AllImagesThumbnails [Placeholder]</p>
        {this.state.styleThumbnails.map((tn, index) => {
          let key = tn.split('-')[1];
          return (<ImageThumbnail
          image_index={index}
          imageId={key}
          selectedPhoto={this.props.selectedPhoto}
          currentImage={this.props.currentImage}
          key={key}
          thumbnail={tn}/>)
        })}
      </div>
      )
    }
    return (
      pageElement
    )
  }
}

AllImagesThumbnails.propTypes = {
  thumbnails: PropTypes.array,
  currentImage: PropTypes.string,
  selectedPhoto: PropTypes.func
}

export default AllImagesThumbnails;