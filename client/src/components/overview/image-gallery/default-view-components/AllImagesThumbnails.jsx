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
         <div className="image-list">
        {props.thumbnails.slice(props.topImageIndex, props.bottomImageIndex + 1).map((tn, i) => {
          const getIndex = (url) => {
            return url.split('-')[1] === tn.split('-')[1]
          };

          let index = props.thumbnails.findIndex(getIndex);
          let key = tn.split('-')[1];
          let wrappedProps = {
            image_index: index,
            imageId: key,
            selectedPhoto: props.selectedPhoto,
            currentImage: props.currentImage,
            key: key,
            thumbnail: tn,
            hidden: false
          }
          let WrappedImageThumbnail = MetricWrapper(ImageThumbnail, wrappedProps)
          if (i <= 6) {
            return (<WrappedImageThumbnail key={`key-${key}`}/>)
          } else if (index > 6){
            let hiddenWrappedProps = wrappedProps;
            hiddenWrappedProps['hidden'] = true;
            let HiddenWrappedImageThumbnail = MetricWrapper(ImageThumbnail, hiddenWrappedProps)
            return (<HiddenWrappedImageThumbnail key={`key-${key}`}/>)
          }
        })}
         </div>
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