import React, { Component } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx'

class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
      <div className="relatedItemsWidget">
        <RelatedProducts />
        <YourOutfit />
      </div>
      </>
    )
  }
}

export default RelatedItemsWidget;