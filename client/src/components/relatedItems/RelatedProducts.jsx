import React, { Component } from 'react';
import Carousels from './Carousels.jsx';

class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="relatedProducts">
        <Carousels />
      </div>
    )
  }
}

export default RelatedProducts;