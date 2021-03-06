import React from 'react';
import Cards from './Cards.jsx';
import PropTypes from 'prop-types';
import MetricsWrapper from '../MetricsWrapper.jsx';


const YourOutfit = ({yourOutfitArray, id, addToOutfits, overviewId, setOverviewId, deleteYourOutfits, interaction}) => {

    const items = yourOutfitArray;

    let page = <div></div>;

    if (!items) {
      page =
        <div className="your-outfit-container">
        </div>
    } else {
      page =
        <div className="your-outfit-container">
          <h3>Your Outfit</h3>
          <div className="your-outfit-carousel" data-testid="your-outfit-id">
            <div className="card" data-testid='test-id' id={id}>
              <button aria-label="add-item-to-list" onClick={(e) => {
                addToOutfits(overviewId);
                interaction(`${e.target}`, 'RelatedItems', new Date())
              }} className="add-to-outfits">Add This Item to Your Outfit List</button>
            </div>

            {items.length > 0 && items.map((eachItem) => {
              let wrappedProps = {
                displayButton: 'your-outfit',
                id: eachItem.id,
                category: eachItem.category,
                features: eachItem.features,
                image: eachItem.image,
                name: eachItem.name,
                price: eachItem.price,
                salePrice: eachItem.salePrice,
                ratings: eachItem.ratings,
                setOverviewId: setOverviewId,
                deleteYourOutfits: deleteYourOutfits
              }
              let WrappedCards = MetricsWrapper(Cards, wrappedProps);
              return <WrappedCards key={'yo-' + eachItem.id} />
            })}
          </div>
        </div>
    }
      return (page)
  }


YourOutfit.propTypes = {
    interaction: PropTypes.func,
    overviewId: PropTypes.number,
    setOverviewId: PropTypes.func,
    id: PropTypes.number,
    setYourOutfitsIds: PropTypes.func,
    yourOutfitIds: PropTypes.array,
    yourOutfitArray: PropTypes.array,
    deleteYourOutfits: PropTypes.func,
    addToOutfits: PropTypes.func,
    setOverviewIdData: PropTypes.func
  }

export default YourOutfit;