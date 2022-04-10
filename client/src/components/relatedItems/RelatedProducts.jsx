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
    this.setRelatedProductsId = this.setRelatedProductsId.bind(this);
    this.setCard = this.setCard.bind(this);
    this.setRelatedProductsData = this.setRelatedProductsData.bind(this);
  }


  componentDidMount() {
    Promise.all([
      this.setRelatedProductsId(),
      this.setRelatedProductsData()
    ]).then(values => {
      console.log(values);
    }).then(results => {
      return results;
    }).catch(err => {
        console.log('Oops, something went wrong', err);
    });
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
            console.log('setDescription error');
            return err;
          })
      })
      .catch((err) => {
        console.log('setCard error');
        return err;
      })
    }
  }

  setCard() {
    axios(`http://localhost:8080/styles/${this.state.id}`)
    .then((data) => {
      var result = data.data;
      var newObj = {
        id: result.product_id,
        image: result.results[0].photos[0].thumbnail_url,
        price: result.results[0].original_price
      };
      console.log('setCard obj: ', newObj);
      return newObj;
    })
    .then((obj) => {
        axios(`http://localhost:8080/products/${this.state.id}`)
        .then((data) => {
          var result = data.data;
          var newObj2 = {
            category: result.category,
            name: result.name
          };
          var allData = Object.assign(obj, newObj2);
          var updateData = this.state.relatedProductsData.push(allData);
          this.setState({
            relatedProductsData: updateData
          });
          return result;
        })
        .catch((err) => {
          console.log('setDescription error');
          return err;
        })
    })
    .catch((err) => {
      console.log('setCard error');
      return err;
    })

  }

  // setDescription(obj) {
  //   axios(`http://localhost:8080/products/${this.state.id}`)
  //   .then((data) => {
  //     var result = data.data;
  //     var newObj2 = {
  //       category: result.category,
  //       name: result.name
  //     };
  //     var allData = Object.assign(obj, newObj2);
  //     var updateData = this.state.relatedProductsData.push(allData);
  //     this.setState({
  //       relatedProductsData: updateData
  //     });
  //     return result;
  //   })
  //   .catch((err) => {
  //     console.log('setDescription error');
  //     return err;
  //   })
  // }

  // to render, take this.state.relatedProductsId and for each item, render a card using its ID

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