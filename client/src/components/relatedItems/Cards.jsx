import React, { Component } from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';
import ComparisonModal from './ComparisonModal.jsx';
import MetricsWrapper from '../MetricsWrapper.jsx';


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

    let wrappedProps = {
      id: this.props.id,
      overviewId: this.props.overviewId,
      overviewIdName: this.props.overviewIdName,
      overviewIdFeatures: this.props.overviewIdFeatures,
      name: this.state.name,
      features: this.state.features
    }

    let WrappedComparisonModal = MetricsWrapper(ComparisonModal, wrappedProps);

    return (
      <>
        {this.state.image && this.state.image !== null && this.props.id && this.props.overviewId &&

          <div className="card" data-testid='test-id' id={this.props.id}>

            <div className="card-image">
              <img src={this.state.image} alt="item-image" onClick={(e) => {
                this.props.setOverviewId(this.props.id);
                this.props.interaction(`${e.target}`, 'RelatedItems', new Date())}} />

              {this.props.displayButton === 'related-products' ?

                <>
                  <WrappedComparisonModal />
                </>

                :

                <button aria-label="delete-outfits" className="overlay" onClick={(e) => {
                  this.props.deleteYourOutfits(this.props.id);
                  this.props.interaction(`${e.target}`, 'RelatedItems', new Date())
                }}></button>}


            </div>


            <div className="card-description">
              <br />
              <div className="text-category">
                {this.state.category}
              </div>

              <button aria-label="set-item-from-name" onClick={(e) => {
                this.props.setOverviewId(this.props.id);
                this.props.interaction(`${e.target}`, 'RelatedItems', new Date())}} className="set-text-name">{this.state.name}</button>

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
  interaction: PropTypes.func,
  id: PropTypes.number,
  overviewId: PropTypes.number,
  overviewIdName: PropTypes.string,
  overviewIdFeatures: PropTypes.array,
  setOverviewId: PropTypes.func,
  displayButton: PropTypes.string,
  deleteYourOutfits: PropTypes.func,
}



export default Cards;