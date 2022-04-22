import React from 'react';
import PropTypes from 'prop-types';

import AllImagesThumbnails from './default-view-components/AllImagesThumbnails.jsx';

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
      x: 0,
      y: 0
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
        image_id: image_id
      });
  }

  componentDidUpdate(prevProps) {
    if(this.props.styles !== prevProps.styles || this.props.styleIndex !== prevProps.styleIndex) {
      this.componentDidMount()
      this.selectedPhoto(0)
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
        hiddenPrev: true
      })
    } else if (selectedIndex === 0) {
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: false,
        hiddenPrev: true
      })
    } else if (selectedIndex > 0 && nextPhoto === undefined) {
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: true,
        hiddenPrev: false
      })
    }else{
      this.setState({
        imageIndex: selectedIndex,
        currentPhoto: selectedPhoto,
        image_id: image_id,
        hiddenNext: false,
        hiddenPrev: false
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
        if(pPhoto === undefined) {
          this.setState({
            currentPhoto: prevPhoto,
            imageIndex: photoIndex - 1,
            image_id: image_id,
            hiddenPrev: true
          })
        } else {
          this.setState({
            currentPhoto: prevPhoto,
            imageIndex: photoIndex - 1,
            image_id: image_id,
            hiddenPrev: false,
            hiddenNext: false
          })
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
        if (nPhoto === undefined) {
          this.setState({
            currentPhoto: nextPhoto,
            imageIndex: photoIndex + 1,
            image_id: image_id,
            hiddenNext: true
          })
        } else {
          this.setState({
            currentPhoto: nextPhoto,
            imageIndex: photoIndex + 1,
            image_id: image_id,
            hiddenNext: false,
            hiddenPrev: false
          })
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
      nextButton = (<button onClick={this.cyclePhotos} name="Next">➡️</button>)
    }
    if (this.state.hiddenPrev) {
      prevButton = <></>
    } else {
      prevButton = (<button onClick={this.cyclePhotos} name="Prev">⬅️</button>)
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
          />
          {prevButton}
          <div className="image-container">
          <img
          onMouseEnter={this.mouseMove}
          onMouseMove={this.mouseMove}
          onMouseLeave={this.mouseLeave}
          onClick={this.zoomImage}
          className={viewClassName}
          src={this.state.currentPhoto}
          alt="s-image">
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