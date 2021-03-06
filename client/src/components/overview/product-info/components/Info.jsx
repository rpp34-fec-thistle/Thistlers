import React from 'react';
import PropTypes from 'prop-types';

function Info(props) {
  let price = (<p>${props.info.default_price}</p>)
  if(props.sale_price) {
    price = (
      <div className="prices">
        <p className="old-price">${props.info.default_price}</p>
        <p className="sale-price">${props.sale_price}</p>
      </div>
    )
  }
    return(
      <div className="info">
        <p>{(props.info.category).toUpperCase()}</p>
        <h1>{props.info.name}</h1>
        {price}
      </div>
    )
}

Info.propTypes ={
  info: PropTypes.object,
  sale_price: PropTypes.string
}

export default Info;