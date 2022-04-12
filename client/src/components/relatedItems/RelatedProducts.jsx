import React, { Component } from 'react';
import axios from 'axios';
import Cards from './Cards.jsx';


class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64626,
      relatedProductsIds: []
    };
    this.setRelatedProductsIds = this.setRelatedProductsIds.bind(this);
  }

  componentDidMount() {
    this.setRelatedProductsIds()
  }

  setRelatedProductsIds = () => {

    const relatedIdsAPI = `http://localhost:8080/products/${this.state.overviewId}/related`;

    axios(relatedIdsAPI)
      .then((data) => {
        var result = data.data;
        this.setState({
          relatedProductsIds: result
        });
        return result;
      })
      .catch((err) => {
        console.log('error in setRelatedProductsIds');
        return err;
      })

  }

  render() {

    const items = this.state.relatedProductsIds;

    return(

      <div className="related-products-carousel">
        {items.map((eachId) =>
          <Cards key={eachId} id={eachId} />
        )}
      </div>


    )
  }
}


export default RelatedProducts;


    // {/* {
    //   relatedProductsData.map((eachProduct) =>
    //     <div className="related-item-card" key={eachProduct.id}>
    //       <div className="related-item-card-image">
    //         <img src={eachProduct.image} />
    //       </div>
    //       <div className="related-item-card-description">
    //         {eachProduct.category}
    //         {eachProduct.name}
    //         {eachProduct.price}
    //         <Ratings />
    //       </div>
    //     </div>
    //   )
    // } */}


  //   <div className="related-item-card" key={this.state.id}>
  //   <div className="related-item-card-image">
  //   <img src={this.state.image} />
  //   </div>
  //   <div className="related-item-card-description">
  //     {this.state.category}
  //     {this.state.name}
  //     {this.state.price}
  //     <Ratings />
  //   </div>
  // </div>

    // axios.all([getRelatedStyles, getRelatedProducts])
    // .then(axios.spread((...data) => {
    //   const stylesData = data[0].data;
    //   const productsData = data[1].data;
    //   let stylesObj = {
    //     id: stylesData.product_id,
    //     style: stylesData.results.style_id,
    //     image: stylesData.results[0].photos[0].thumbnail_url,
    //     price: stylesData.results[0].original_price,
    //     salePrice: stylesData.results[0].sale_price
    //   };
    //   let productsObj = {
    //     category: productsData.category,
    //     name: productsData.name
    //   };
    //   const sumData = Object.assign(stylesObj, productsObj)
    //   console.log('related item object: ', sumData);
    //   return sumData;
    // }))
    // .then((data) => {
    //   newArr.push(data);
    //   return newArr;
    // })
    // .else((err) => {
    //   console.log('error from axios.all');
    //   return err;
    // })