import React from 'react';

import SelectSize from './components/SelectSize.jsx';
import Quantity from './components/Quantity.jsx';
import Favorite from './components/Favorite.jsx';
import AddToBag from './components/AddToBag.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}
  }

  render() {
    return(
      <div className="add-to-cart">
       <SelectSize/>
       <Quantity/>
       <Favorite/>
       <AddToBag/>
      </div>
    )
  }
}

export default AddToCart;