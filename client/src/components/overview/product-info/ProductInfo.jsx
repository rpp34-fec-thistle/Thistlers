import React from 'react';
import PropTypes from 'prop-types';

import StarRating from './components/StarRating.jsx';
import Info from './components/Info.jsx';

function ProductInfo(props) {
    return(
      <div data-testid="product-info" className="product-info">
        <h1>TEST</h1>
        <StarRating stars={props.ratings}/>
        <Info sale_price={props.sale_price} info={props.info}/>
      </div>
    )
}

ProductInfo.propTypes = {
  ratings: PropTypes.object,
  info: PropTypes.object,
  sale_price: PropTypes.string
}

export default ProductInfo;