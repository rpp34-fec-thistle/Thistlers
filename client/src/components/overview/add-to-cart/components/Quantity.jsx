import React from 'react';
import PropTypes from 'prop-types';

class Quantity extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      quantity: ''
    }
    this.sendQuantity = this.sendQuantity.bind(this);
  }

  sendQuantity(e) {
    this.props.changeQuantity(e.target.value)
  }

  render() {
    let pageElement = [
        <option key="-">-</option>
    ]
    if (this.props.changeQuantity !== '') {
      pageElement = [];
      for (let i = 1;i <= this.props.stock; i++) {
        if(i === 15) {
          pageElement.push(<option key={i} value={i}>{i}</option>);
          break;
        }
        pageElement.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return(
      <div className="quantity">
        <form>
          <select onChange={this.sendQuantity}>
            {pageElement}
          </select>
        </form>
      </div>
    )
  }
}

Quantity.propTypes = {
  changeQuantity: PropTypes.func,
  stock: PropTypes.number
}

export default Quantity;