import React from 'react';
import PropTypes from 'prop-types';

class SelectSize extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedSize: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      selectedSize: e.target.innerText
    })
    this.props.changeSize(e.target.innerText, e.target.value)
  }

  render() {
    let options =[<option key="select" value="select-size" >Select Size</option>]
    if(this.props.sizes) {
      Object.keys(this.props.sizes).forEach((sku) => {
        if (this.props.sizes[sku].quantity > 0) {
          options.push(
            <option
              key={sku}
              value={sku}>
              {this.props.sizes[sku].size}
            </option>
          )
        }
      })
    }
    return(
      <div className="select-size">
       <form>
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