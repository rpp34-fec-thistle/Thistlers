import React, { Component } from 'react';
import Ratings from './Ratings.jsx';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }




  render() {
    return(
      <div className="card">
        <div className="card-image">
        (image)
        </div>
        <div className="card-description">
          (category)
          (product-name)
          (product-price)
          <Ratings />
        </div>
      </div>
    )
  }
}

export default Cards;