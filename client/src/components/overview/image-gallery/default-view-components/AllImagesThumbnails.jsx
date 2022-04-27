import React from 'react';
import PropTypes from 'prop-types';

import ImageThumbnail from './ImageThumbnail.jsx';
import MetricWrapper from './../../../MetricsWrapper.jsx'
import UpArrow from '../svg-icons/up-arrow.svg'
import DownArrow from '../svg-icons/down-arrow.svg'

function AllImagesThumbnails(props) {
    let pageElement;
    let nextButton;
    let prevButton;
    if (props.thumbnails === undefined) {
     pageElement = (
     <div className="all-image-tns">
       <p>AllImagesThumbnails [Placeholder]</p>
     </div>
     )
    } else {
      if (props.next) {
        nextButton = <></>
      } else {
        nextButton = (<button aria-label="next-image" className="down-button" onClick={props.cycle} name="Next">
          <img alt="down-arrow-next-image" name="Next" onClick={props.cycle} className="down-img" src={DownArrow}></img>
        </button>)
      }

      if(props.prev) {
        prevButton = <></>
      } else {
        prevButton = (<button aria-label="previous-image" className="up-button" onClick={props.cycle} name="Prev">
          <img alt="up-arrow-previous-image" name="Prev" onClick={props.cycle} className="up-img" src={UpArrow}></img>
        </button>)
      }
      pageElement = (
        <div className="all-image-tns">
         {prevButton}
        {props.thumbnails.map((tn, index) => {
          let key = tn.split('-')[1];
          let wrappedProps = {
            image_index: index,
            imageId: key,
            selectedPhoto: props.selectedPhoto,
            currentImage: props.currentImage,
            key: key,
            thumbnail: tn
          }
          let WrappedImageThumbnail = MetricWrapper(ImageThumbnail, wrappedProps)
          return (<WrappedImageThumbnail key={`key-${index}`}/>)
        })}
          {nextButton}
      </div>
      )
    }
    return (
      pageElement
    )

}

AllImagesThumbnails.propTypes = {
  thumbnails: PropTypes.array,
  currentImage: PropTypes.string,
  selectedPhoto: PropTypes.func
}

export default AllImagesThumbnails;