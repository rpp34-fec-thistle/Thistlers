import React, { Component } from 'react';
import Cards from './Cards.jsx';
import axios from 'axios';

class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testOverviewId: 64620,
      relatedProductsArr: []
    };
    this.setRelatedProducts.bind(this);
  }

  setRelatedProducts() {
    axios(`http://localhost:8080/products/${this.state.testOverviewId}/related`)
      .then((data) => {
        var result = data.data;
        this.setState({
          relatedProductsArr: result
        });
        return result;
      })
      .catch((err) => {
        console.log('error in setRelatedProducts');
        return err;
      })

  //   // take currentId
  //   // look up relatedItems via axios request to server
  //   // write express API query / GET request via relatedItems:id
  }

  componentDidMount() {
    this.setRelatedProducts();
  }


  // to render, take this.state.relatedProductsArr and for each item, render a card using its ID

  render() {
    return(
      <div className="relatedProducts">
        <Cards /><Cards /><Cards /><Cards />
      </div>
    )
  }
}

export default RelatedProducts;