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
            let urlTnSplit = url.tn.split('-');
            let urlCheck = urlTnSplit[1] + urlTnSplit[2];
            let tnSplit = tn.tn.split('-');
            let tnCheck = tnSplit[1] + tnSplit[2];
            return urlCheck  === tnCheck
          };

          let index = props.thumbnails.findIndex(getIndex);
          let splitUrlString = tn.tn.split('-');
          let image_id = splitUrlString[1] + splitUrlString[2];
          image_id += tn.name;
          // let key = tn.tn.split('-')[1] + tn.name;
          let wrappedProps = {
            image_index: index,
            imageId: image_id,
            selectedPhoto: props.selectedPhoto,
            currentImage: props.currentImage,
            key: image_id,
            thumbnail: tn.tn,
            hidden: false
          }
          let WrappedImageThumbnail = MetricWrapper(ImageThumbnail, wrappedProps)
          if (i <= 6) {
            return (<WrappedImageThumbnail key={`key-${image_id}`}/>)
          } else if (index > 6){
            let hiddenWrappedProps = wrappedProps;
            hiddenWrappedProps['hidden'] = true;
            let HiddenWrappedImageThumbnail = MetricWrapper(ImageThumbnail, hiddenWrappedProps)
            return (<HiddenWrappedImageThumbnail key={`key-${image_id}`}/>)
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