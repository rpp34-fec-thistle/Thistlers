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
          console.log('good')
        })
        .catch((err) => {
          console.log('CLIENT: AddtoBag ERROR:', err)
        })
    }
  }
    return(
      <div className="add-to-bag">
       <button onClick={add}>Add To Bag</button>
      </div>
    )
}

AddToBag.propTypes = {
  sku: PropTypes.string,
  quantity: PropTypes.number
}

export default AddToBag;