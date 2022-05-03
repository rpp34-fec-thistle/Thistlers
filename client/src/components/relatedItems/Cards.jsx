import React, { Component } from 'react';
// import axios from 'axios';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';
import ComparisonModal from './ComparisonModal.jsx';
import MetricsWrapper from '../MetricsWrapper.jsx';
import { Link } from 'react-router-dom';

class Cards extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let wrappedProps = {
      id: this.props.id,
      overviewId: this.props.overviewId,
      overviewIdName: this.props.overviewIdName,
      overviewIdFeatures: this.props.overviewIdFeatures,
      name: this.props.name,
      features: this.props.features,
    }

    let WrappedComparisonModal = MetricsWrapper(ComparisonModal, wrappedProps);

    return (
      <>

        {this.props.image !== null &&

          <div className="card" data-testid='test-id' id={'card-' + this.props.id}>

            <div className="card-image">

            <Link to={`/${this.props.id}`}>
            <img src={this.props.image} alt="item-image" onClick={(e) => {
                this.props.setOverviewId(this.props.id);
                this.props.interaction(`${e.target}`, 'RelatedItems', new Date())
              }} />
            </Link>

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
                {this.props.category}
              </div>

              <Link to={`/${this.props.id}`}>
                  <button aria-label="set-item-from-name" onClick={(e) => {
                this.props.setOverviewId(this.props.id);
                this.props.interaction(`${e.target}`, 'RelatedItems', new Date())
              }} className="set-text-name">{this.props.name}</button>
              </Link>

              {this.props.salePrice === null ?
                <div className="text-price">
                  {this.props.price}
                </div> :
                <>
                  <div className="price-change">
                    {this.props.price}
                  </div>
                  <div className="sale-price">
                    {this.props.salePrice}
                  </div>
                </>
              }

              <br />
              <Ratings id={this.props.id} ratings={this.props.ratings}/>
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
  loaded: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  ratings: PropTypes.number,
  features: PropTypes.array,
  category: PropTypes.string,
  salePrice: PropTypes.number,
  price: PropTypes.string
}

export default Cards;