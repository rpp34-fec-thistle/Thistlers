import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '64620',
      data: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/styles/${this.state.product_id}`)
      .then((response) => {
        this.setState({
          data: response.data.results
        })
      })
      .catch((err) => {
        console.log('CLIENT: Get Styles ERROR:', err)
      })
  }

  render() {
    let view;

    if(this.props.view === 'default') {
      view = <DefaultView styles={this.state.data}/>;
    }
    if(this.props.view === 'expanded') {
      view = <ExpandedView />;
    }
    return (
      <div className="image-gallery">
        {view}
      </div>
    )
  }
}

ImageGallery.propTypes = {
  view: PropTypes.string
}

export default ImageGallery;