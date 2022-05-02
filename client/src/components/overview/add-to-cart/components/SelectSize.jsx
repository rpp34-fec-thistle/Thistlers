import React from 'react';
import PropTypes from 'prop-types';

class SelectSize extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedSize: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let size = e.target.innerText;
    let sku = e.target.value
    this.props.changeSize(size, sku)
  }

  render() {
    let options =[<option key="select" value="select-size" >SELECT SIZE</option>]
    if(this.props.sizes) {
      Object.keys(this.props.sizes).forEach((sku) => {
          options.push(
            <option
              key={sku}
              value={sku}>
              {this.props.sizes[sku].size}
            </option>
          )
      })
    }
    return(
      <div className="select-size">
       <form id="sizes-form">
        <select name="sizes" id="sizes" onChange={this.handleChange}>
          {options}
        </select>
       </form>
      </div>
    )
  }
}

SelectSize.propTypes = {
  sizes: PropTypes.object,
  changeSize: PropTypes.func
}

export default SelectSize;