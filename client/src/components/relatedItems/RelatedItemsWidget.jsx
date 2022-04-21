import React, { Component } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx'

class RelatedItemsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64626
    }
    this.setOverviewId = this.setOverviewId.bind(this)
  }

  componentDidMount() {
   this.setOverviewId(this.state.overviewId)
  }

  setOverviewId = (id) => {
    this.setState({
      overviewId: id
    })
  }

  render() {
    return (
      <>
      <div className="related-items-widget">
        <h3>Related Products</h3>
        <RelatedProducts overviewId={this.state.overviewId} setOverviewId={this.setOverviewId}/>
      </div>
      <div className="related-items-widget">
        <h3>Your Outfit</h3>
        <YourOutfit overviewId={this.state.overviewId} setOverviewId={this.setOverviewId}/>
      </div>
      </>
    )
  }
}

export default RelatedItemsWidget;