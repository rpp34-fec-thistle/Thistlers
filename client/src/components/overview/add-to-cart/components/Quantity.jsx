import React from 'react';
import PropTypes from 'prop-types';

function Quantity(props){
  const sendQuantity = (e) => {
    props.changeQuantity(e.target.value)
  }

  let pageElement = [<option key="-">-</option>];
  if (props.changeQuantity !== '') {
    pageElement = [];
    for (let i = 1;i <= props.stock; i++) {
      if(i === 15) {
        pageElement.push(<option key={`quantity-${i}`} value={i}>{i}</option>);
        break;
      }
      pageElement.push(<option key={`quantity-${i}`} value={i}>{i}</option>);
    }
  }

  return(
    <div className="quantity">
      <form id="quantity-tab">
        <select onChange={sendQuantity}>
          {pageElement}
        </select>
      </form>
    </div>
  )

}

Quantity.propTypes = {
  changeQuantity: PropTypes.func,
  stock: PropTypes.number
}

export default Quantity;