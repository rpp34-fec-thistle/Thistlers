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
        relatedProductsIds: []
      })
      this.setOverviewIdData();
  }

  setOverviewIdData() {

    const endpoints = [
      `http://localhost:8080/products/${this.state.overviewId}`,
      `http://localhost:8080/products/${this.state.overviewId}/related`];


    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(axios.spread((overview, related) => {

          var overviewResult = overview.data;
          const valueArrayMaker = (objArr) => {
            let newArray = [];
            objArr.forEach((obj) => {
              if (obj.value !== null) {
                newArray.push(obj.value);
              }
            })
            return newArray;
          }
          var itemFeatures = valueArrayMaker(overviewResult.features);

          var relatedResult = related.data;
          var uniqueResults = [...new Set(relatedResult)].filter(id => id !== this.state.overviewId);

          this.setState({
            overviewIdName: overviewResult.name,
            overviewIdFeatures: itemFeatures,
            relatedProductsIds: uniqueResults,
            loaded: true
          });
          return uniqueResults;

      }))
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

    return (
      <>
        <div className="related-items-widget">
          <RelatedProducts overviewId={this.state.overviewId} overviewIdName={this.state.overviewIdName} overviewIdFeatures={this.state.overviewIdFeatures} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} />
          <WrappedYourOutfit />
          <div id="comparison-modal-overlay"></div>
        </div>
      </>
    )
  }
}

import PropTypes from 'prop-types';

RelatedItemsWidget.propTypes = {
  interaction: PropTypes.func,
  productId: PropTypes.string,
  changeId: PropTypes.func
}


export default RelatedItemsWidget;