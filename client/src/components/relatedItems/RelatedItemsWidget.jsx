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
      yourOutfitIds: [],
      yourOutfitArray: [],
      relatedProductsLoaded: false,
      yourOutfitLoaded: false,
      loaded: true
    }
    this.setOverviewId = this.setOverviewId.bind(this);
    this.setOverviewIdData = this.setOverviewIdData.bind(this);
    this.setCards = this.setCards.bind(this);
    this.setRelatedArray = this.setRelatedArray.bind(this);
    this.setYourOutfitsIds = this.setYourOutfitsIds.bind(this);
    this.deleteYourOutfits = this.deleteYourOutfits.bind(this);
    this.addToOutfits = this.addToOutfits.bind(this);
  }

  // this.props.product_id: '',
  // this.props.setOverviewId(id)

  componentDidMount() {
    let newId = parseInt(this.props.productId);
    this.setOverviewId(newId)
  }

  setOverviewId(id) {

    let idString = id.toString();
    this.props.changeId(idString);

    this.setState({
      overviewId: id,
      relatedProductsIds: [],
      relatedProductsLoaded: false
    })

    this.setOverviewIdData();
  }


  setOverviewIdData() {

    const endpoints = [
      `/products/${this.state.overviewId}`,
      `/products/${this.state.overviewId}/related`];

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
      .then((dataArray) => {
        this.setRelatedArray(dataArray)
      })
      .then(() => {
        this.setYourOutfitsIds();
        return this.state.yourOutfitIds
      })
      .then((array) => {
        if (array.length > 0) {
          this.setYourOutfitArray(array);
        }
      })
      .catch((err) => {
        console.log('error in setOverviewIdData');
        return err;
      })
  }

  setRelatedArray(idArray) {
    Promise.all(idArray.map((item) => {
      return Promise.resolve(this.setCards(item));
    })).then((values) => {
      this.setState({
        relatedProductsArray: values,
        relatedProductsLoaded: true
      })
    })
  }

  setYourOutfitArray(idArray) {
    if (idArray.length === 0) {
      this.setState({
        yourOutfitArray: [],
        yourOutfitLoaded: true
      })
    } else {
      Promise.all(idArray.map((item) => {
        return Promise.resolve(this.setCards(item));
        })).then((values) => {
          this.setState({
            yourOutfitArray: values,
            yourOutfitLoaded: true
          })
        })
    }
  }

  setYourOutfitsIds() {
    if (window.localStorage.yourOutfits) {
      let testArray = window.localStorage.getItem('yourOutfits');
      testArray = testArray.split(',').map(x => parseInt(x));
      this.setState({
        yourOutfitIds: testArray
      })
    } else {
      window.localStorage.setItem('yourOutfits', []);
    }
  }


  setCards(eachItem) {

    const endpoints = [
      `/styles/${eachItem}`,
      `/products/${eachItem}`,
      `/reviews/${eachItem}`];

    return axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(axios.spread((styles, products, ratings) => {

        var stylesResults = styles.data;
        var image = stylesResults.results[0].photos[0].thumbnail_url;
        var price = stylesResults.results[0].original_price;
        var salePrice = stylesResults.results[0].sale_price;

        var productsResults = products.data;
        var category = productsResults.category;
        var name = productsResults.name;
        const valueArrayMaker = (objArr) => {
          let newArray = [];
          objArr.forEach((obj) => {
            if (obj.value !== null) {
              newArray.push(obj.value);
            }
          })
          return newArray;
        }
        var features = valueArrayMaker(productsResults.features)

        var ratingsResults = ratings.data;
        var ratingsObj = ratingsResults.ratings;

        var hasRatings = Object.keys(ratingsObj).length > 0;

        if (!hasRatings) {
          var averageScore = null;
        } else {
          var ratingsArr = Object.entries(ratingsObj);
          var totalScore = 0;
          for (var i = 0; i < ratingsArr.length; i++) {
            var currentPair = ratingsArr[i];
            var score = parseInt(currentPair[0]);
            var votes = parseInt(currentPair[1]);
            var pairTotal = score * votes;
            totalScore += pairTotal;
          }
          var totalRatings = Object.values(ratingsObj).map(x => parseInt(x)).reduce((a, b) => a + b, 0);
          averageScore = Math.round((totalScore / totalRatings) * 100) / 100;
        }

        var newItemObj = {
          'id': eachItem,
          'image': image,
          'price': price,
          'salePrice': salePrice,
          'category': category,
          'name': name,
          'features': features,
          'ratings': averageScore
        }
        return newItemObj;
      }))
      .catch((err) => {
        console.log('API call to setCard() error');
        return err;
      })
  }

  deleteYourOutfits(id) {

    if (this.state.yourOutfitIds.length === 1) {
      window.localStorage.clear();
      window.localStorage.setItem('yourOutfits', []);
      this.setState({
        yourOutfitIds: []
      })
      this.setYourOutfitArray([]);
    } else {
      let originalArray = this.state.yourOutfitIds;
      let newArray = [];
      for (var i = 0; i < originalArray.length; i++) {
        if (originalArray[i] !== id) {
          newArray.push(originalArray[i]);
        }
      }
      this.setState({
        yourOutfitIds: newArray
      })
      window.localStorage.setItem('yourOutfits', newArray);
      this.setYourOutfitArray(newArray);
    }
  }

  addToOutfits(id) {

    let originalArray = this.state.yourOutfitIds;
    let localStorageArray = window.localStorage.yourOutfits.split(',');

    if (localStorageArray.indexOf(id.toString()) !== -1) {
      return;
    }
    if (window.localStorage.yourOutfits === '') {
      let newArray = [id]
      this.setState({
        yourOutfitIds: newArray
      })
      window.localStorage.setItem('yourOutfits', [id]);
      this.setYourOutfitArray(newArray);
    } else {
      let newArray = [...new Set([id, ...originalArray])];
      this.setState({
        yourOutfitIds: newArray
      })
      window.localStorage.setItem('yourOutfits', newArray);
      this.setYourOutfitArray(newArray);
    }
  }


  render() {

    let wrappedProps = {
      overviewId: this.state.overviewId,
      relatedProductsIds: this.state.relatedProductsIds,
      setOverviewId: this.setOverviewId,
      setYourOutfitsIds: this.setYourOutfitsIds,
      yourOutfitIds: this.state.yourOutfitIds,
      yourOutfitArray: this.state.yourOutfitArray,
      setYourOutfitArray: this.setYourOutfitArray,
      deleteYourOutfits: this.deleteYourOutfits,
      addToOutfits: this.addToOutfits,
      setOverviewIdData: this.setOverviewIdData
    }

    let WrappedYourOutfit = MetricsWrapper(YourOutfit, wrappedProps);

    let page = <div></div>

    if (this.state.relatedProductsLoaded) {

      page =
        <div className="related-items-widget">
          <RelatedProducts overviewId={this.state.overviewId} overviewIdName={this.state.overviewIdName} overviewIdFeatures={this.state.overviewIdFeatures} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} relatedProductsArray={this.state.relatedProductsArray} setOverviewIdData={this.setOverviewIdData} />
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