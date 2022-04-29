import React from 'react';
import PropTypes from 'prop-types';

import AllImagesThumbnails from './default-view-components/AllImagesThumbnails.jsx';
import LeftArrow from './svg-icons/left-arrow.svg'
import RightArrow from './svg-icons/right-arrow.svg'


class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      currentPhoto: '',
      currentStyle: 0,
      hiddenPrev: true,
      hiddenNext: false,
      zoomed: false,
      topImageIndex: 0,
      bottomImageIndex: 6
    }

    this.cyclePhotos = this.cyclePhotos.bind(this);
    this.selectedPhoto = this.selectedPhoto.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.zoomImage = this.zoomImage.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentDidMount() {
      let thumbnails = this.props.styles[this.props.styleIndex].photos.map((photo) => {
        return photo.thumbnail_url
      });
      let image_id = this.props.styles[this.props.styleIndex].photos[0].url.split('-')[1];
      this.setState({
        styles: this.props.styles,
        currentPhoto: this.props.styles[this.props.styleIndex].photos[0].url,
        imageIndex: 0,
        currentStyle: this.props.styleIndex,
        thumbnails: thumbnails,
        image_id: image_id,
        topImageIndex: 0,
        bottomImageIndex: 6
      });
  }

  componentDidUpdate(prevProps) {
    if(this.props.styles !== prevProps.styles || this.props.styleIndex !== prevProps.styleIndex) {
      this.componentDidMount()
      this.selectedPhoto(0)
    } else if (this.props.currentView !== prevProps.currentView) {
      if (this.props.currentView === 'default') {
        this.setState({zoomed: false})
      }
    }

  }

  zoomImage() {
    if (this.props.currentView === 'expanded') {
      if (this.state.zoomed) {
        this.setState({zoomed: false})
      } else {
        this.setState({zoomed: true})
      }
    }
  }

  mouseMove(e){
    if (this.state.zoomed) {
      let image = document.querySelector('.image-container');
      let mouseX = e.nativeEvent.offsetX;
      let mouseY = e.nativeEvent.offsetY;
     image.scrollTo({
       top: (mouseY * 1.5),
       left: (mouseX * 1.5),
       behavior: 'auto'
     })
    }
  }
  mouseLeave() {
    if (this.state.zoomed) {
      let image = document.querySelector('.image-container');
      let width = image.offsetWidth;
      let height = image.offsetHeight;
     image.scrollTo({
       top: (height / 1.5),
       left: (width / 1.5),
       behavior: 'auto'
     })
    }
  }

  selectedPhoto(selectedIndex) {
    let currentStyleIndex = this.props.styleIndex;
    let selectedPhoto = this.props.styles[currentStyleIndex].photos[selectedIndex]?.url;
    let image_id = selectedPhoto.split('-')[1];
    let nextPhoto = this.props.styles[currentStyleIndex].photos[selectedIndex + 1]

    if (selectedIndex === 0 && nextPhoto === undefined) {
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: true,
        hiddenPrev: true,
        zoomed: false
      })
    } else if (selectedIndex === 0) {
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: false,
        hiddenPrev: true,
        zoomed: false
      })
    } else if (selectedIndex > 0 && nextPhoto === undefined) {
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: true,
        hiddenPrev: false,
        zoomed: false
      })
    }else{
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: false,
        hiddenPrev: false,
        zoomed: false
      })
    }
  }

  prevImage() {
    let currentStyleIndex = this.props.styleIndex;
    let photoIndex = this.state.imageIndex;
    let prevPhoto = this.props.styles[currentStyleIndex].photos[photoIndex - 1]?.url;
    let pPhoto = this.props.styles[currentStyleIndex].photos[photoIndex - 2]?.url;

    let image_id = prevPhoto?.split('-')[1];

    if (prevPhoto !== undefined) {
      let topImageIndex = this.state.topImageIndex;
      let bottomImageIndex = this.state.bottomImageIndex;
      if(photoIndex === bottomImageIndex) {
        if(pPhoto === undefined) {
          if (topImageIndex - 1 >= 0) {
            this.setState({
              currentPhoto: prevPhoto,
              imageIndex: photoIndex - 1,
              image_id: image_id,
              hiddenPrev: true,
              topImageIndex: topImageIndex - 1,
              bottomImageIndex: bottomImageIndex - 1,
              zoomed: false
            })
          }
        } else {
          if (topImageIndex - 1 >= 0) {
            this.setState({
              currentPhoto: prevPhoto,
              imageIndex: photoIndex - 1,
              image_id: image_id,
              hiddenPrev: false,
              hiddenNext: false,
              topImageIndex: topImageIndex - 1,
              bottomImageIndex: bottomImageIndex - 1,
              zoomed: false
            })
          } else {
            this.setState({
              currentPhoto: prevPhoto,
              imageIndex: photoIndex - 1,
              image_id: image_id,
              hiddenPrev: false,
              hiddenNext: false,
              zoomed: false
            })
          }
        }
      } else {
          if(pPhoto === undefined) {
            this.setState({
              currentPhoto: prevPhoto,
              imageIndex: photoIndex - 1,
              image_id: image_id,
              hiddenPrev: true,
              zoomed: false
            })
          } else {
            this.setState({
              currentPhoto: prevPhoto,
              imageIndex: photoIndex - 1,
              image_id: image_id,
              hiddenPrev: false,
              hiddenNext: false,
              zoomed: false
            })
          }
      }
    }
  }
  nextImage() {
    let currentStyleIndex = this.props.styleIndex;
    let photoIndex = this.state.imageIndex;
    let nextPhoto = this.props.styles[currentStyleIndex].photos[photoIndex + 1]?.url;
    let nPhoto = this.props.styles[currentStyleIndex].photos[photoIndex + 2]?.url;

    let image_id = nextPhoto?.split('-')[1];

      if (nextPhoto !== undefined) {
        let topImageIndex = this.state.topImageIndex;
        let bottomImageIndex = this.state.bottomImageIndex;
        if (photoIndex === bottomImageIndex) {
          if (nPhoto === undefined) {
            this.setState({
              currentPhoto: nextPhoto,
              imageIndex: photoIndex + 1,
              image_id: image_id,
              hiddenNext: true,
              topImageIndex: topImageIndex + 1,
              bottomImageIndex: bottomImageIndex + 1,
              zoomed: false
            })
          } else {
            this.setState({
              currentPhoto: nextPhoto,
              imageIndex: photoIndex + 1,
              image_id: image_id,
              hiddenNext: false,
              hiddenPrev: false,
              topImageIndex: topImageIndex + 1,
              bottomImageIndex: bottomImageIndex + 1,
              zoomed: false
            })
          }
        } else {
          if (nPhoto === undefined) {
            this.setState({
              currentPhoto: nextPhoto,
              imageIndex: photoIndex + 1,
              image_id: image_id,
              hiddenNext: true,
              zoomed: false
            })
          } else {
            this.setState({
              currentPhoto: nextPhoto,
              imageIndex: photoIndex + 1,
              image_id: image_id,
              hiddenNext: false,
              hiddenPrev: false,
              zoomed: false
            })
          }
        }
      }
  }

  cyclePhotos(e) {
    e.preventDefault()
    if(e.target.name === 'Next') {
      this.nextImage()
    } else {
      this.prevImage()
    }
  }

  render() {
    let nextButton;
    let prevButton;
    if (this.state.hiddenNext) {
      nextButton = <></>
    } else {
      nextButton = (<button className="next-button-main" onClick={this.cyclePhotos} name="Next">
        <img alt="next-image-button" className="next-img" src={RightArrow} onClick={this.cyclePhotos} name="Next"></img>
      </button>)
    }
    if (this.state.hiddenPrev) {
      prevButton = <></>
    } else {
      prevButton = (
      <button  className="prev-button-main" onClick={this.cyclePhotos} name="Prev">
        <img
          alt="previous-image-button"
          className="prev-img"
          src={LeftArrow}
          onClick={this.cyclePhotos}
          name="Prev"></img>
      </button>)
    }
    let viewClassName;
    if (this.props.currentView === 'default') {
      viewClassName = 'selected-image';
    } else if (this.state.zoomed) {
      viewClassName = "expanded-zoom"
    } else {
      viewClassName = 'selected-image-expanded';
    }
    return(
      <div data-testid="default-view" className="default-view">
        <div className="overview-images">
          <AllImagesThumbnails
            thumbnails={this.state.thumbnails}
            currentImage={this.state.image_id}
            selectedPhoto={this.selectedPhoto}
            cycle={this.cyclePhotos}
            next={this.state.hiddenNext}
            prev={this.state.hiddenPrev}
            topImageIndex={this.state.topImageIndex}
            bottomImageIndex={this.state.bottomImageIndex}
          />
          {prevButton}
          <div className="image-container">
          <img
          onMouseMove={this.mouseMove}
          // onMouseLeave={this.mouseLeave}
          onClick={this.zoomImage}
          className={viewClassName}
          src={this.state.currentPhoto}
          alt="selected-image">
          </img>
          </div>
          {nextButton}
        </div>
      </div>
    )
  }
}

DefaultView.propTypes = {
  styles: PropTypes.array,
  styleIndex: PropTypes.number,
  currentView: PropTypes.string
}



export default DefaultView;