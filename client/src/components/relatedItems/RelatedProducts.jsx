import React from 'react';
import Cards from './Cards.jsx';
import PropTypes from 'prop-types';
import MetricsWrapper from '../MetricsWrapper.jsx';

const RelatedProducts = ({relatedProductsArray, overviewId, overviewIdName, overviewIdFeatures, setOverviewId}) => {

    let items = relatedProductsArray;
    let page = <div></div>;

    if (items.length === 0) {

      page =
        <div className="related-products-container">
        </div>

    } else {

      page =
        <div className="related-products-container">
          <h3>Related Products</h3>
          <div className="related-products-carousel" data-testid='related-products-id'>
            {items.length > 0 && items.map((eachItem) => {
              let wrappedProps = {
                displayButton: 'related-products',
                id: eachItem.id,
                category: eachItem.category,
                features: eachItem.features,
                image: eachItem.image,
                name: eachItem.name,
                price: eachItem.price,
                salePrice: eachItem.salePrice,
                ratings: eachItem.ratings,
                overviewId: overviewId,
                overviewIdName: overviewIdName,
                overviewIdFeatures: overviewIdFeatures,
                setOverviewId: setOverviewId
              }
              let WrappedCards = MetricsWrapper(Cards, wrappedProps);
              return <WrappedCards key={'rp-' + eachItem.id} />
            }
            )}
          </div>
        </div>

    }

    return (page)

  }

RelatedProducts.propTypes = {
  interaction: PropTypes.func,
  overviewId: PropTypes.number,
  overviewIdName: PropTypes.string,
  overviewIdFeatures: PropTypes.array,
  setOverviewId: PropTypes.func,
  setOverviewIdData: PropTypes.func,
  relatedProductsIds: PropTypes.array,
  relatedProductsArray: PropTypes.array
}

export default RelatedProducts;