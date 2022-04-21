import React, { Component } from 'react';
import axios from 'axios';
import Cards from './Cards.jsx';


class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewId: 64626,
      relatedProductsIds: [],
      relatedProductsData: [],
      image: '',
      price: null,
      salePrice: null,
      category: '',
      name: ''
    };
    this.setCards = this.setCards.bind(this);
    this.setNewItem = this.setNewItem.bind(this);
    this.handleOverviewIdChange = this.handleOverviewIdChange.bind(this);
  }


  componentDidMount() {
    this.setCards();
  }

  setCards() {

    const relatedIdsAPI = `http://localhost:8080/products/${this.state.overviewId}/related`;

    const stylesAPI = `http://localhost:8080/styles/`;
    const productsAPI = `http://localhost:8080/products/`;


    // get all related IDs based on overview ID
    axios(relatedIdsAPI)
      .then((data) => {
        var result = data.data;
        this.setState({
          relatedProductsIds: result
        });
        return result;
      })
      // use result array to render cards array
      .then((cardArray) => {
        console.log(stylesAPI + cardArray[0])
        // cardArray.map((eachCard) => {

        //   axios.get(stylesAPI)
        //     .then((data) => {
        //       var result = data.data;
        //       this.setState({
        //         image: result.results[0].photos[0].thumbnail_url,
        //         price: result.results[0].original_price,
        //         salePrice: result.results[0].sale_price
        //       });
        //       return result;
        //     })
        //     .then(() => {
        //       axios.get(productsAPI)
        //         .then((data) => {
        //           var result = data.data;
        //           this.setState({
        //             category: result.category,
        //             name: result.name
        //           });
        //           return result;
        //         })
        //         .catch((err) => {
        //           // console.log('API call to /products error');
        //           return err;
        //         })
        //     })
        //     .catch((err) => {
        //       // console.log('API call to /styles error');
        //       return err;
        //     })
      })
      .catch((err) => {
        console.log('error in setRelatedProductsIds');
        return err;
      })

  }

  setNewItem() {
    this.handleOverviewIdChange(this.props.id);
  }

  handleOverviewIdChange = (id) => {
    this.setState({
      overviewId: id
    })
    this.setRelatedProductsIds();
  }

  // setRelatedProductsIds = () => {

  //   const relatedIdsAPI = `http://localhost:8080/products/${this.state.overviewId}/related`;

  //   axios(relatedIdsAPI)
  //     .then((data) => {
  //       var result = data.data;
  //       this.setState({
  //         relatedProductsIds: result
  //       });
  //       return result;
  //     })
  //     .catch((err) => {
  //       // console.log('error in setRelatedProductsIds');
  //       return err;
  //     })

  // }

  render() {

    const items = this.state.relatedProductsData;

    return (

      <div className="related-products-carousel" data-testid='related-products-id'>

        <>

          {items !== [] &&

              {items.map((item) => {
                {item.image !== null &&
                <div className="card" data-testid='test-id'>

                  <div className="card-image">
                    <img src={item.image} alt='This is an image of the product as described below.' onMouseDown={this.setNewItem} />
                    <button className="overlay"></button>
                  </div>

                  <div className="card-description">

                    <br />

                    <div className="text-category">
                      {item.category}
                    </div>


                    <button onMouseDown={this.setNewItem} className="set-text-name">{item.name}</button>

                    <div className="text-price">
                      {item.price}
                    </div>

                    <br />
                    <Ratings id={item.id} />}})}

                  </div>
          }
                </>

        </div>

      )
  }
}


          export default RelatedProducts;
