import React, { Component } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import MetricsWrapper from '../MetricsWrapper.jsx';

class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64620,
      overviewIdName: '',
      overviewIdFeatures: [],
      relatedProductsIds: [],
      relatedProductsArray: [],
      loaded: false
    }
    this.setOverviewId = this.setOverviewId.bind(this);
    this.setOverviewIdData = this.setOverviewIdData.bind(this);
  }

  // this.props.product_id: '',
  // this.props.setOverviewId(id)

  componentDidMount() {
    this.setOverviewIdData();
  }


  setOverviewId(id) {

    let idString = id.toString();
    this.props.changeId(idString);

    this.setState({
      overviewId: id,
      relatedProductsIds: [],
      loaded: false
    })
    this.setOverviewIdData();
  }


  setOverviewIdData() {

    this.setState({
      loaded: false
    })

    const endpoints = [
      `http://localhost:8080/products/${this.state.overviewId}`,
      `http://localhost:8080/products/${this.state.overviewId}/related`];


    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(axios.spread((overview, related) => {

        var overviewResult = overview.data;
        var itemFeatures = overviewResult.features.map((x) => {
          if (x.value !== null) {
            return x.value;
          }
        });

        var relatedResult = related.data;
        var uniqueResults = [...new Set(relatedResult)].filter(id => id !== this.state.overviewId);

        this.setState({
          overviewIdName: overviewResult.name,
          overviewIdFeatures: itemFeatures,
          relatedProductsIds: uniqueResults
        });

        return uniqueResults;

      }))
      // .then((idArray) => {

      //   // creating an array that contains objects with info of each item
      //   var newItemArray = [];

      //   ////// map
      //   Promise.all([...idArray.map((eachItem) => {

      //     // for each ID, get info from APIs
      //     const endpoints = [
      //       `http://localhost:8080/styles/${eachItem}`,
      //       `http://localhost:8080/products/${eachItem}`,
      //       `http://localhost:8080/reviews/${eachItem}`];

      //     axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      //       .then(axios.spread((styles, products, ratings) => {

      //         var stylesResults = styles.data;
      //           var image = stylesResults.results[0].photos[0].thumbnail_url;
      //           var price = stylesResults.results[0].original_price;
      //           var salePrice = stylesResults.results[0].sale_price;

      //         var productsResults = products.data;
      //           var category = productsResults.category;
      //           var name = productsResults.name;
      //             const valueArrayMaker = (objArr) => {
      //               let newArray = [];
      //               objArr.forEach((obj) => {
      //                 if (obj.value !== null) {
      //                   newArray.push(obj.value);
      //                 }
      //               })
      //               return newArray;
      //             }
      //           var features = valueArrayMaker(productsResults.features)

      //         var ratingsResults = ratings.data;
      //         var ratingsObj = ratingsResults.ratings;

      //         var hasRatings = Object.keys(ratingsObj).length > 0;

      //         if (!hasRatings) {
      //           var averageScore = null;
      //         } else {
      //           var ratingsArr = Object.entries(ratingsObj);
      //           var totalScore = 0;
      //           for (var i = 0; i < ratingsArr.length; i++) {
      //             var currentPair = ratingsArr[i];
      //             var score = parseInt(currentPair[0]);
      //             var votes = parseInt(currentPair[1]);
      //             var pairTotal = score * votes;
      //             totalScore += pairTotal;
      //           }
      //           var totalRatings = Object.values(ratingsObj).map(x => parseInt(x)).reduce((a, b) => a + b, 0);
      //           averageScore = Math.round((totalScore / totalRatings) * 100) / 100;
      //         }

      //         var newItemObj = {
      //           'id': eachItem,
      //           'image': image,
      //           'price': price,
      //           'salePrice': salePrice,
      //           'category': category,
      //           'name': name,
      //           'features': features,
      //           'ratings': averageScore
      //         }

      //           newItemArray.push(newItemObj);

      //         return newItemObj;

      //       }))
      //       .catch((err) => {
      //         console.log('API call to setCard() error');
      //         return err;
      //       })
      //   })])
      //   .catch((err) => {
      //     console.log('mapped promises error: ', err)
      //   })

      //   // mysterious array with objects but no length appears here
      //   // console.log('newItemArray: ', newItemArray);

      //   return newItemArray;

      // })
      // .then((array) => {
      //   this.setState({
      //     relatedProductsArray: array
      //   })
      //   return array;
      // })
      .then(() => {
        this.setState({
          loaded: true
        })
      })
      .catch((err) => {
        console.log('error in setOverviewIdData');
        return err;
      })


  }


  render() {

    let wrappedProps = {
      overviewId: this.state.overviewId,
      relatedProductsIds: this.state.relatedProductsIds,
      setOverviewId: this.setOverviewId
    }

    let WrappedYourOutfit = MetricsWrapper(YourOutfit, wrappedProps);

    let page = <div></div>

    if (this.state.loaded) {

      page =
        <div className="related-items-widget">
          <RelatedProducts overviewId={this.state.overviewId} overviewIdName={this.state.overviewIdName} overviewIdFeatures={this.state.overviewIdFeatures} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} relatedProductsArray={this.state.relatedProductsArray} />
          <WrappedYourOutfit />
          <div id="comparison-modal-overlay"></div>
        </div>
      }

    return (page)

  }
}

import PropTypes from 'prop-types';

RelatedItemsWidget.propTypes = {
  interaction: PropTypes.func,
  productId: PropTypes.string,
  changeId: PropTypes.func
}


export default RelatedItemsWidget;