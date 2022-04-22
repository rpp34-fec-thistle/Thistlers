import React, { Component } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';


class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64626,
      relatedProductsIds: []
    }
    this.setOverviewId = this.setOverviewId.bind(this);
    this.setRelatedProductsIds = this.setRelatedProductsIds.bind(this);
  }

  componentDidMount() {
   this.setOverviewId(this.state.overviewId);
  }

  setOverviewId = (id) => {
    this.setState({
      overviewId: id
    })
    this.setRelatedProductsIds();
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
    return (
      <>
      <div className="related-items-widget">
        <RelatedProducts overviewId={this.state.overviewId} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} setRelatedProductsIds={this.setRelatedProductsIds}/>
        <YourOutfit overviewId={this.state.overviewId} relatedProductsIds={this.state.relatedProductsIds} setOverviewId={this.setOverviewId} setRelatedProductsIds={this.setRelatedProductsIds}/>
      </div>
      </>
    )
  }
}

export default RelatedItemsWidget;