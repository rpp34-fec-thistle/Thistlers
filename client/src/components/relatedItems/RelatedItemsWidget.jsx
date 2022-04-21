import React, { Component } from 'react';
import OldRelatedProducts from './OldRelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx'

class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
      <div className="related-items-widget">
        <h3>Related Products</h3>
        <OldRelatedProducts />
      </div>
      <div className="related-items-widget">
        <h3>Your Outfit</h3>
        <YourOutfit />
      </div>
      </>
    )
  }
}

export default RelatedItemsWidget;