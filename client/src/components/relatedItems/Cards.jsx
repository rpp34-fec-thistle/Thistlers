import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style_id: null,
      image: '',
      price: null,
      salePrice: null,
      category: '',
      name: ''
    };
    this.setCard = this.setCard.bind(this);
  }

  componentDidMount() {
    this.setCard()
  }

  setCard() {

    const stylesAPI = `http://localhost:8080/styles/${this.props.id}`;
    const productsAPI = `http://localhost:8080/products/${this.props.id}`;

    axios.get(stylesAPI)
      .then((data) => {
        var result = data.data;
        this.setState({
          style_id: result.results[0].style_id,
          image: result.results[0].photos[0].thumbnail_url,
          price: result.results[0].original_price,
          salePrice: result.results[0].sale_price
        });
        return result;
      })
      .then(() => {
        axios.get(productsAPI)
          .then((data) => {
            var result = data.data;
            this.setState({
              category: result.category,
              name: result.name
            });
            return result;
          })
          .catch((err) => {
            // console.log('API call to /products error');
            return err;
          })
      })
      .catch((err) => {
        // console.log('API call to /styles error');
        return err;
      })

  }

  render() {

    return (
      <>
      {this.state.image !== null &&
        <div className="card" key={this.props.id} data-testid='test-id'>
          <div className="card-image">
            <img src={this.state.image} alt='This is an image of the product as described below.'/>
          </div>
          <div className="card-description">
            {this.state.category}<br />
            {this.state.name}<br />
            {this.state.price}<br />
            <Ratings id={this.props.id} />
          </div>
        </div>}
      </>
    )
  }

}

Cards.propTypes = {
    id: PropTypes.number
}



export default Cards;