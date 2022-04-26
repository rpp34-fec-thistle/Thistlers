import React from 'react';
import PropTypes from 'prop-types';

class SelectSize extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedSize: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.test = this.test.bind(this);
  }

  test() {
   document.getElementById('sizes').focus()
   document.getElementById('sizes').click()

  }

  handleChange(e) {
    this.props.changeSize(e.target.innerText, e.target.value)
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