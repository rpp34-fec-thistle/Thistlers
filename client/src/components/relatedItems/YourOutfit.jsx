import React, { Component } from 'react';
import Cards from './Cards.jsx';


class YourOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourOutfitIds: []
    }
    this.onSetItem = this.onSetItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onSetItem(e) {
    e.preventDefault();
    localStorage.setItem('yourOutfitIds', this.state.yourOutfitIds);
  }

  onDeleteItem(e) {
    e.preventDefault();
    let id = e.target.value;
    let originalArray = this.state.yourOutfitIds;
    let newArray = [];
    for (var i = 0; i < originalArray.length; i++) {
      if (originalArray[i] !== id) {
        newArray.push(originalArray[i]);
      }
    }
    this.setState({
      yourOutfitIds: newArray
    })
    localStorage.setItem('yourOutfitIds', this.state.yourOutfitIds);
  }

  render() {

      const items = this.state.yourOutfitIds;

      return(
        <>
        <div className="your-outfit-carousel">
          {items.map((eachId) =>
            <Cards key={eachId} id={eachId} />
          )}
        </div>
        </>
    )
  }
}

export default YourOutfit;