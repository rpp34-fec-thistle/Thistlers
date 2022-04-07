import React from 'react';
import axios from 'axios';

import StarRating from './components/StarRating.jsx';
import Info from './components/Info.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      product_id: '64620',
      info: [],
      avgstars:{}
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/products/${this.state.product_id}`)
      .then((response) => {
        this.setState({
          info: response.data
        })
        axios.get(`http://localhost:8080/avgstars/${this.state.product_id}`)
          .then((response) => {
            this.setState({
              avgstars: response.data.ratings
            })
          })
          .catch((err) => {
            console.log('CLIENT: GET Avg Stars ERROR:', err);
          })
      })
      .catch((err) => {
        console.log('CLIENT: GET Product Info ERROR:', err);
      })
  }

  render() {
    return(
      <div className="product-info">
        <StarRating stars={this.state.avgstars}/>
        <Info info={this.state.info}/>
      </div>
    )
  }
}

export default ProductInfo;