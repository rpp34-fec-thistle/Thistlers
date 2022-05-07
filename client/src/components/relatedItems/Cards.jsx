import React from 'react';
import Ratings from './Ratings.jsx';
import PropTypes from 'prop-types';
import ComparisonModal from './ComparisonModal.jsx';
import MetricsWrapper from '../MetricsWrapper.jsx';
import { Link } from 'react-router-dom';

const Cards = ({ interaction, id, overviewId, overviewIdName, overviewIdFeatures, setOverviewId, displayButton, deleteYourOutfits, image, name, ratings, features, category, salePrice, price }) => {

  let wrappedProps = {
    id: id,
    overviewId: overviewId,
    overviewIdName: overviewIdName,
    overviewIdFeatures: overviewIdFeatures,
    name: name,
    features: features,
  }

  let WrappedComparisonModal = MetricsWrapper(ComparisonModal, wrappedProps);

  return (
    <>
      {image !== null &&

        <div className="card" data-testid='test-id' id={'card-' + id}>

          <div className="card-image">

            <Link to={`/${id}`}>
              <img src={image} alt="item-image" onClick={(e) => {
                setOverviewId(id);
                interaction(`${e.target}`, 'RelatedItems', new Date())
              }} />
            </Link>

            {displayButton === 'related-products' ?
              <>
                <WrappedComparisonModal />
              </>
              :
              <button aria-label="delete-outfits" className="overlay" onClick={(e) => {
                deleteYourOutfits(id);
                interaction(`${e.target}`, 'RelatedItems', new Date())
              }}></button>}

          </div>

          <div className="card-description">
            <br />
            <div className="text-category">
              {category}
            </div>

            <Link to={`/${id}`}>
              <button aria-label="set-item-from-name" onClick={(e) => {
                setOverviewId(id);
                interaction(`${e.target}`, 'RelatedItems', new Date())
              }} className="set-text-name">{name}</button>
            </Link>

            {salePrice === null ?
              <div className="text-price">
                {price}
              </div> :
              <>
                <div className="price-change">
                  {price}
                </div>
                <div className="sale-price">
                  {salePrice}
                </div>
              </>
            }

            <br />
            <Ratings id={id} ratings={ratings} />
          </div>
        </div>}
    </>
  )
};

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