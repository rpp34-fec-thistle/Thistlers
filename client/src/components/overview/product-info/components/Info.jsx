import React from 'react';
import PropTypes from 'prop-types';

function Info(props) {
  let price = (<p>${props.info.default_price}</p>)
  if(props.sale_price) {
    price = (
      <div>
        <p className="old-price">${props.info.default_price}</p>
        <p className="sale-price">${props.sale_price}</p>
      </div>
    )
  }
    return(
      <div className="info">
        {props.info.category}
        <h4>{props.info.name}</h4>
        {price}
      </div>
    )
}

Info.propTypes ={
  info: PropTypes.object,
  sale_price: PropTypes.string
}

export default Info;