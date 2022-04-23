import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function AddToBag(props) {
  let add = () => {
    if (props.sku !== '') {
      let promises = []
      for (let i = 0; i < props.quantity; i++) {
        promises.push(axios.post('http://localhost:8080/cart', {sku_id: props.sku}))
      }
      Promise.all(promises)
        .then(()=> {

        })
        .catch((err) => {
          console.log('CLIENT: AddtoBag ERROR:', err)
        })
    }
  }
  let pageElement = <></>
  if(props.stock <= 0 || props.stock === undefined) {
    pageElement = (
      <div>
      </div>
    )
  } else {
    pageElement = (
      <div className="add-to-bag">
         <button id="add" onClick={add}>Add To Bag        +</button>
      </div>
    )
  }
    return(
      pageElement
    )
}

AddToBag.propTypes = {
  sku: PropTypes.string,
  quantity: PropTypes.string,
  stock: PropTypes.number
}

export default AddToBag;