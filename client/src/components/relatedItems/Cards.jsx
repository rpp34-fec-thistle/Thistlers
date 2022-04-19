import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      price: null,
      salePrice: null,
      category: '',
      name: ''
    };
    this.setCard = this.setCard.bind(this);
    this.setNewItem = this.setNewItem.bind(this);
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

  setNewItem () {
    this.props.handleOverviewIdChange(this.props.id);
  }

  render() {

    return (
      <>
      {this.state.image !== null &&
        <div className="card" data-testid='test-id'>

          <div className="card-image">
            <img src={this.state.image} alt='This is an image of the product as described below.' onMouseDown={this.setNewItem}/>
            <span className="overlay">
            </span>
          </div>


          <div className="card-description">
            <br />
            <div className="text-category">
              {this.state.category}
            </div>

              <button onMouseDown={this.setNewItem} className="set-text-name">{this.state.name}</button>

            <div className="text-price">
              {this.state.price}
            </div>

            <br />
            <Ratings id={this.props.id} />
          </div>
        </div>}
      </>
    )
  }

}

Cards.propTypes = {
    id: PropTypes.number,
    overviewId: PropTypes.number,
    handleOverviewIdChange: PropTypes.func
}



export default Cards;