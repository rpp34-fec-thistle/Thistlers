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
    this.handleOverviewIdChange = this.handleOverviewIdChange.bind(this);
  }

  handleOverviewIdChange = (id) => {
    this.setState({
      overviewId: id
    })
    this.setRelatedProductsIds();
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
        // console.log('error in setRelatedProductsIds');
        return err;
      })

  }

  render() {

    const items = this.state.relatedProductsIds;

    return(

      <div className="related-products-carousel">
        {items.map((eachId) =>
          <Cards key={eachId} id={eachId} overviewId={this.state.overviewId} handleOverviewIdChange={this.handleOverviewIdChange}/>
        )}
      </div>


    )
  }
}


export default RelatedProducts;
