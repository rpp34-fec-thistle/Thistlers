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
    this.clickModal = this.clickModal.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  componentDidMount() {
    this.setCard();
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
            console.log('API call to /products error');
            return err;
          })
      })
      .catch((err) => {
        console.log('API call to /styles error');
        return err;
      })

  }

  clickModal(e) {
    e.preventDefault();
    console.log('modal will render')
  }

  clickDelete() {
    this.props.deleteYourOutfits(this.props.id);
  }


  render() {

    return (
      <>
      {this.state.image && this.state.image !== null &&
        <div className="card" data-testid='test-id' id={this.props.id}>

          <div className="card-image">
            <img src={this.state.image} alt='This is an image of the product as described below.' onClick={()=> this.props.setOverviewId(this.props.id)}/>

            {this.props.displayButton === 'related-products' ?
              <>
              <button className="overlay" onClick={this.clickModal}></button>
                <div className="comparison-modal" id="comparison-modal">
                  <div className="comparison-modal-header">
                    <div className="comparison-modal-title">Comparison Modal</div>
                      <button className="comparison-modal-close-button">&times;</button>
                    </div>
                    <div className="comparison-modal-body">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id laborum commodi dolore obcaecati quisquam itaque dignissimos maiores voluptate ducimus, sunt, ea temporibus laudantium atque est enim ratione exercitationem nemo dolores molestiae vitae et explicabo aut praesentium fugiat? Amet, expedita ex?
                  </div>
                </div>

              </>

              : <button className="overlay" onClick={this.clickDelete}></button> }


          </div>


          <div className="card-description">
            <br />
            <div className="text-category">
              {this.state.category}
            </div>

              <button onClick={()=> this.props.setOverviewId(this.props.id)} className="set-text-name">{this.state.name}</button>

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
    setOverviewId: PropTypes.func,
    displayButton: PropTypes.string,
    deleteYourOutfits: PropTypes.func,
    setRelatedProductsIds: PropTypes.func
}



export default Cards;