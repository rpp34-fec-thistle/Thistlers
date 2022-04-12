import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: '',
      image: '',
      price: 0,
      salePrice: 0,
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
          style: result.results.style_id,
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
            console.log('API call to /products error');
            return err;
          })
      })
      .catch((err) => {
        console.log('API call to /styles error');
        return err;
      })

  }




  render() {

    return (
      <>
        <div className="related-item-card" key={this.props.id}>
          <div className="related-item-card-image">
            <img src={this.state.image} />
          </div>
          <div className="related-item-card-description">
            {this.state.category}
            {this.state.name}
            {this.state.price}
            henlo
            <Ratings />
          </div>
        </div>
      </>
    )
  }

}

Cards.propTypes = {
    id: PropTypes.number
}



export default Cards;


    //     <div className="related-item-card" key={eachProduct.id}>
    //       <div className="related-item-card-image">
    //         <img src={eachProduct.image} />
    //       </div>
    //       <div className="related-item-card-description">
    //         {eachProduct.category}
    //         {eachProduct.name}
    //         {eachProduct.price}
    //         <Ratings />
    //       </div>
    //     </div>



// axios(`http://localhost:8080/styles/${this.props.overviewId}`)
// .then((data) => {
//   var result = data.data;
//   // console.log(result);
//   this.setState({
//     id: result.product_id,
//     image: result.results[0].photos[0].thumbnail_url,
//     price: result.results[0].original_price
//   });
//   return result;
// })
// .then(() => {
//   this.setDescription();
// })
// .catch((err) => {
//   // console.log('setCard error');
//   return err;
// })

// axios(`http://localhost:8080/products/${this.state.id}`)
// .then((data) => {
//   var result = data.data;
//   // console.log(result);
//   this.setState({
//     category: result.category,
//     name: result.name
//   });
//   return result;
// })
// .catch((err) => {
//   console.log('setDescription error');
//   return err;
// })

  // this.setState({
  //   style: stylesData.results.style_id,
  //   image: stylesData.results[0].photos[0].thumbnail_url,
  //   price: stylesData.results[0].original_price,
  //   salePrice: stylesData.results[0].sale_price,
  //   category: productsData.category,
  //   name: productsData.name
  // });