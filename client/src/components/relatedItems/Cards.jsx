import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';
import ComparisonModal from './ComparisonModal.jsx'

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      price: null,
      salePrice: null,
      category: '',
      name: '',
      features: []
    }
    this.setCard = this.setCard.bind(this);
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

            const valueArrayMaker = (objArr) => {
              let newArray = [];
              objArr.forEach((obj) => {
                if (obj.value !== null) {
                  newArray.push(obj.value);
                }
              })
              return newArray;
            }

            var itemFeatures = valueArrayMaker(result.features)

            this.setState({
              category: result.category,
              name: result.name,
              features: itemFeatures
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
        {this.state.image && this.state.image !== null && this.props.id && this.props.overviewId &&

          <div className="card" data-testid='test-id' id={this.props.id}>

            <div className="card-image">
              <img src={this.state.image} alt="item-image" onClick={() => this.props.setOverviewId(this.props.id)} />

              {this.props.displayButton === 'related-products' ?

                <>
                  <ComparisonModal id={this.props.id} overviewId={this.props.overviewId} overviewIdName={this.props.overviewIdName} name={this.state.name} overviewIdFeatures={this.props.overviewIdFeatures} features={this.state.features} />
                </>

                :

                <button aria-label="delete-outfits" className="overlay" onClick={() => { this.props.deleteYourOutfits(this.props.id) }}></button>}


            </div>


            <div className="card-description">
              <br />
              <div className="text-category">
                {this.state.category}
              </div>

              <button onClick={() => {this.props.setOverviewId(this.props.id)}} className="set-text-name">{this.state.name}</button>

              {this.state.salePrice === null ?
                <div className="text-price">
                  {this.state.price}
                </div> :
                <>
                <div className="price-change">
                  {this.state.price}
                </div>
                <div className="sale-price">
                  {this.state.salePrice}
                </div>
                </>
              }


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
  overviewIdName: PropTypes.string,
  overviewIdFeatures: PropTypes.array,
  setOverviewId: PropTypes.func,
  displayButton: PropTypes.string,
  deleteYourOutfits: PropTypes.func,
}



export default Cards;