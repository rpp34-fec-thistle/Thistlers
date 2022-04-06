import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testId: 64620,
      testImage: '',
      testPrice: 0,
      testCategory: '',
      testName: '',
      testReviews: ''
    }
    this.setCard = this.setCard.bind(this);
    this.setDescription = this.setDescription.bind(this);
  }

  setCard() {
    axios(`http://localhost:8080/styles/${this.state.testId}`)
    .then((data) => {
      var result = data.data;
      // console.log(result);
      this.setState({
        testId: result.product_id,
        testImage: result.results[0].photos[0].thumbnail_url,
        testPrice: result.results[0].original_price
      });
      return result;
    })
    .then(() => {
      this.setDescription();
    })
    .catch((err) => {
      console.log('setCard error');
      return err;
    })

  }

  setDescription() {
    axios(`http://localhost:8080/products/${this.state.testId}`)
    .then((data) => {
      var result = data.data;
      console.log(result);
      this.setState({
        testCategory: result.category,
        testName: result.name
      });
      return result;
    })
    .catch((err) => {
      console.log('setDescription error');
      return err;
    })
  }

  componentDidMount() {
    this.setCard();
  }

  render() {

    return(
      <div className="card" key={this.state.testId}>
        <div className="card-image">
        <img src={this.state.testImage} />
        </div>
        <div className="card-description">
          {this.state.testCategory}
          {this.state.testName}
          {this.state.testPrice}
          <Ratings />
        </div>
      </div>
    )
  }
}

export default Cards;