import React, { Component } from 'react';
import Cards from './Cards.jsx';
import PropTypes from 'prop-types';
import MetricsWrapper from '../MetricsWrapper.jsx';


class RelatedProducts extends Component {

  render() {

    // console.log('logging data array from Related Products Component', this.props.relatedProductsArray);
    // console.log('logging relatedProductsIds from Related Products Component', this.props.relatedProductsIds);


    const items = this.props.relatedProductsArray;

    return (

      <>
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
                overviewId: this.props.overviewId,
                overviewIdName: this.props.overviewIdName,
                overviewIdFeatures: this.props.overviewIdFeatures,
                setOverviewId: this.props.setOverviewId,
                loaded: this.props.loaded
              }

              let WrappedCards = MetricsWrapper(Cards, wrappedProps);

              return <WrappedCards key={'rp-' + eachItem.id} />

            }

            )}
          </div>

        </div>
      </>

    )
  }
}

RelatedProducts.propTypes = {
  interaction: PropTypes.func,
  overviewId: PropTypes.number,
  overviewIdName: PropTypes.string,
  overviewIdFeatures: PropTypes.array,
  setOverviewId: PropTypes.func,
  relatedProductsIds: PropTypes.array,
  relatedProductsArray: PropTypes.array,
  loaded: PropTypes.bool
}

export default RelatedProducts;


{/* <>
<div className="related-products-container">

  <h3>Related Products</h3>
  <div className="related-products-carousel" data-testid='related-products-id'>
    {items.length > 0 && items.map((eachId) => {

      let wrappedProps = {
        displayButton: 'related-products',
        id: eachId,
        overviewId: this.props.overviewId,
        overviewIdName: this.props.overviewIdName,
        overviewIdFeatures: this.props.overviewIdFeatures,
        setOverviewId: this.props.setOverviewId,
        relatedProductsIds: this.props.relatedProductsIds,
      }

      let WrappedCards = MetricsWrapper(Cards, wrappedProps);

      return <WrappedCards key={'rp-' + eachId} />

    }

    )}
  </div>

</div>
</> */}