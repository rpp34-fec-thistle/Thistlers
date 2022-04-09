// import React, { Component } from 'react';
// // import PropTypes from 'prop-types';
// import axios from 'axios';
// import Ratings from './Ratings.jsx';

// class Cards extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: 0,
//       image: '',
//       price: 0,
//       category: '',
//       name: '',
//       reviews: ''
//     }
//     this.setCard = this.setCard.bind(this);
//     this.setDescription = this.setDescription.bind(this);
//   }

//   setCard() {
//     axios(`http://localhost:8080/styles/${this.state.id}`)
//     .then((data) => {
//       var result = data.data;
//       // console.log(result);
//       this.setState({
//         id: result.product_id,
//         image: result.results[0].photos[0].thumbnail_url,
//         price: result.results[0].original_price
//       });
//       return result;
//     })
//     .then(() => {
//       this.setDescription();
//     })
//     .catch((err) => {
//       // console.log('setCard error');
//       return err;
//     })

//   }

//   setDescription() {
//     axios(`http://localhost:8080/products/${this.state.id}`)
//     .then((data) => {
//       var result = data.data;
//       // console.log(result);
//       this.setState({
//         category: result.category,
//         name: result.name
//       });
//       return result;
//     })
//     .catch((err) => {
//       console.log('setDescription error');
//       return err;
//     })
//   }

//   componentDidMount() {
//     this.setCard();
//   }

//   render() {

//     return(
//       <div className="card" key={this.state.id}>
//         <div className="card-image">
//         <img src={this.state.image} />
//         </div>
//         <div className="card-description">
//           {this.state.category}
//           {this.state.name}
//           {this.state.price}
//           <Ratings />
//         </div>
//       </div>
//     )
//   }
// }

// // Cards.propTypes = {
// //   setCard: PropTypes.func.isRequired,
// //   setDescription: PropTypes.func.isRequired
// // }

// export default Cards;