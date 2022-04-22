import React, { Component } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';


class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64626,
      overviewIdName: '',
      overviewIdFeatures: [],
      relatedProductsIds: []
    }
    this.setOverviewId = this.setOverviewId.bind(this);
    this.setOverviewIdData = this.setOverviewIdData.bind(this);
    this.setRelatedProductsIds = this.setRelatedProductsIds.bind(this);
  }

  componentDidMount() {
   this.setOverviewId(this.state.overviewId);
  }

  setOverviewId = (id) => {
    this.setState({
      overviewId: id
    })
    this.setOverviewIdData();
    this.setRelatedProductsIds();
  }

  setOverviewIdData = () => {

    const overviewIdAPI = `http://localhost:8080/products/${this.state.overviewId}`;

    axios(overviewIdAPI)
     .then((data) => {
       var result = data.data;

       const valueArrayMaker = (objArr) => {
        let newArray = [];
        objArr.forEach((obj) => {
          if (obj.value !== null) {
            newArray.push(obj.value);
          }
        })
        return newArray;
      }

      var itemFeatures = valueArrayMaker(result.features)

       this.setState({
         overviewIdName: result.name,
         overviewIdFeatures: itemFeatures
       })
       return result;
     })
     .catch((err) => {
       console.log('error in setOverviewIdData');
       return err;
     })

  }

  setRelatedProductsIds = () => {

    const relatedIdsAPI = `http://localhost:8080/products/${this.state.overviewId}/related`;

    axios(relatedIdsAPI)
      .then((data) => {
        var result = data.data;
        var uniqueResults = [...new Set(result)];
        this.setState({
          relatedProductsIds: uniqueResults
        });
        return uniqueResults;
      })
      .catch((err) => {
        console.log('error in setRelatedProductsIds');
        return err;
      })

  }

  render() {
    console.log('overviewIdFeatures: ', this.state.overviewIdFeatures)

    return (
      <>
      <div className="related-items-widget">
        <RelatedProducts overviewId={this.state.overviewId} overviewIdName={this.state.overviewIdName} overviewIdFeatures={this.state.overviewIdFeatures} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} setRelatedProductsIds={this.setRelatedProductsIds}/>
        <YourOutfit overviewId={this.state.overviewId} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} setRelatedProductsIds={this.setRelatedProductsIds}/>
      </div>
      </>
    )
  }
}

export default RelatedItemsWidget;