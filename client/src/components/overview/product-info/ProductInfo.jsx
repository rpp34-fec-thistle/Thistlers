import React from 'react';

import StarRating from './StarRating.jsx';
import Info from './Info.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}
  }

  render() {
    return(
      <div className="product-info">
        <StarRating/>
        <Info/>
      </div>
    )
  }
}

export default ProductInfo;