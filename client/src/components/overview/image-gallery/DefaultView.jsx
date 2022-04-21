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
      hiddenNext: false
    }

    this.cyclePhotos = this.cyclePhotos.bind(this);
    this.selectedPhoto = this.selectedPhoto.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
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


    // this.setState({
    //   imageIndex: selectedIndex,
    //   currentPhoto: selectedPhoto,
    //   image_id: image_id
    // })
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
      console.log('next')
      nextButton = <></>
    } else {
      nextButton = (<button onClick={this.cyclePhotos} name="Next">➡️</button>)
    }
    if (this.state.hiddenPrev) {
      console.log('prev')
      prevButton = <></>
    } else {
      prevButton = (<button onClick={this.cyclePhotos} name="Prev">⬅️</button>)
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
          <img
          className="selected-image"
          src={this.state.currentPhoto}
          alt="s-image">
          </img>
          {nextButton}
        </div>
      </div>
    )
  }
}

DefaultView.propTypes = {
  styles: PropTypes.array,
  styleIndex: PropTypes.number
}



export default DefaultView;