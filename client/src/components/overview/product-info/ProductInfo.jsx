import React from 'react';
import PropTypes from 'prop-types';

import StarRating from './components/StarRating.jsx';
import Info from './components/Info.jsx';

function ProductInfo(props) {
    return(
      <div className="product-info">
        <StarRating stars={props.ratings}/>
        <Info info={props.info}/>
      </div>
    )
}

ProductInfo.propTypes = {
  ratings: PropTypes.object,
  info: PropTypes.object
}

export default ProductInfo;