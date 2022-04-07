import React from 'react';

import ImageGallery from './image-gallery/ImageGallery.jsx';
import ProductInfo from './product-info/ProductInfo.jsx';
import StyleSelector from './style-selector/StyleSelector.jsx';
import AddToCart from './add-to-cart/AddToCart.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default'
    }
  }

  render() {
    return (
      <div className="overview-main">
        <ImageGallery view={this.state.view}/>
        <div className="right-pane">
          <ProductInfo/>
          <StyleSelector/>
          <AddToCart/>
        </div>
      </div>
    )
  }
}

export default Overview;