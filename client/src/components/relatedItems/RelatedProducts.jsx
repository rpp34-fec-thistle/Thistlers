import React, { Component } from 'react';
import Cards from './Cards.jsx';
import PropTypes from 'prop-types';
import MetricsWrapper from '../MetricsWrapper.jsx';


class RelatedProducts extends Component {

  render() {

    const items = this.props.relatedProductsIds;

    return (

      <>
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
              // <Cards key={'rp-' + eachId} displayButton={'related-products'} id={eachId} overviewId={this.props.overviewId} overviewIdName={this.props.overviewIdName} overviewIdFeatures={this.props.overviewIdFeatures} setOverviewId={this.props.setOverviewId} />

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
}

export default RelatedProducts;
