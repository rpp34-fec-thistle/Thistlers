import React from 'react';
import PropTypes from 'prop-types';

import SelectSize from './components/SelectSize.jsx';
import Quantity from './components/Quantity.jsx';
import AddToBag from './components/AddToBag.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedQuantity: '0',
      sku: ''
    }

    this.changeSize = this.changeSize.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeSize(size, sku) {
    this.setState({
      sku: sku,
      selectedQuantity: "1"
    })
  }

  changeQuantity(quantity) {
    this.setState({
      selectedQuantity: quantity
    })
  }

  render() {
    return(
      <>
        <div data-testid="add-to-cart" className="add-to-cart">
          <SelectSize
            changeSize={this.changeSize}
            sizes={this.props.styles[this.props.styleIndex]?.skus}
          />
          <Quantity
            changeQuantity={this.changeQuantity}
            sku={this.state.sku}
            stock={this.props.styles[this.props.styleIndex]?.skus[this.state.sku]?.quantity}
          />
        </div>
        <div className="bag">
          <AddToBag
          sku={this.state.sku}
          quantity={this.state.selectedQuantity}
          stock={this.props.styles[this.props.styleIndex]?.skus[this.state.sku]?.quantity}
          />
        </div>
      </>
    )
  }
}

AddToCart.propTypes = {
  styles: PropTypes.array,
  styleIndex: PropTypes.number
}

export default AddToCart;