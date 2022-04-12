import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';

class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testOverviewId: 64620,
      relatedProductsIds: [],
      relatedProductsData: []
    };
    this.setRelatedProductsIds = this.setRelatedProductsIds.bind(this);
  }


  componentDidMount() {
    this.setRelatedProductsId()
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
  }

  setRelatedProductsData() {
    for (var id in this.relatedProductsIds) {
      axios(`http://localhost:8080/styles/${id}`)
      .then((data) => {
        var result = data.data;
        var newObj = {
          id: result.product_id,
          style: result.results.style_id,
          image: result.results[0].photos[0].thumbnail_url,
          price: result.results[0].original_price,
          salePrice: result.results[0].sale_price
        };
        console.log('setCard obj: ', newObj);
        return newObj;
      })
      .then((obj) => {
          axios(`http://localhost:8080/products/${id}`)
          .then((data) => {
            var result = data.data;
            var newObj2 = {
              category: result.category,
              name: result.name
            };
            var allData = Object.assign(obj, newObj2);
            var updateData = this.relatedProductsData.push(allData);
            return updateData;
          })
          .then((itemArray) =>
            this.setState({
              relatedProductsData: itemArray
            })
          )
          .catch((err) => {
            console.log('API call to /products error');
            return err;
          })
      })
      .catch((err) => {
        console.log('API call to /styles error');
        return err;
      })
    }
  }

  // need to set Reviews data


  render() {

    return(
      <div className="related-item-card" key={this.state.id}>
        <div className="related-item-card-image">
        <img src={this.state.image} />
        </div>
        <div className="related-item-card-description">
          {this.state.category}
          {this.state.name}
          {this.state.price}
          <Ratings />
        </div>
      </div>
    )
  }
}

export default RelatedProducts;