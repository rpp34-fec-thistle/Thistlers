import React, { Component } from 'react';
import Cards from './Cards.jsx';
import axios from 'axios';

class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testOverviewId: 64620,
      relatedProductsIds: [],
      relatedProductsData: [],
      currentCard: 0,
    };
    this.setRelatedProductsId = this.setRelatedProductsId.bind(this);
  }

  setRelatedProductsId() {
    axios(`http://localhost:8080/products/${this.state.testOverviewId}/related`)
      .then((data) => {
        var result = data.data;
        this.setState({
          relatedProductsIds: result
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
    this.setRelatedProductsId();
  }

  // to render, take this.state.relatedProductsId and for each item, render a card using its ID

  render() {

    return(
      <div className="relatedProducts">
        <Cards /><Cards /><Cards /><Cards />
      </div>
    )
  }
}

export default RelatedProducts;