import React, { Component } from 'react';
import Cards from './Cards.jsx';


class YourOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // yourOutfitIds: [64624, 64628, 64626, 64621, 64620]
      yourOutfitIds: []
    }
    this.onSetItem = this.onSetItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  componentDidMount() {
    this.onSetItem()
  }

  onSetItem() {
    window.localStorage.clear();
    window.localStorage.setItem('yourOutfits', [64624, 64628, 64626, 64621, 64620]);
    let testArray = window.localStorage.getItem('yourOutfits');
    testArray = testArray.split(',').map(x => parseInt(x));
    this.setState({
      yourOutfitIds: testArray
    })
  }

  onGetItem(){
    JSON.parse(window.localStorage.getItem('yourOutfits'));
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
    window.localStorage.setItem('yourOutfits', this.state.yourOutfitIds);
  }

  render() {

      const items = this.state.yourOutfitIds;

      return(
        <>
        <div className="your-outfit-carousel">
          {items.map((eachId) =>
            <Cards key={eachId} id={eachId} overviewId={this.state.overviewId} handleOverviewIdChange={this.handleOverviewIdChange}/>
          )}
        </div>
        </>
    )
  }
}

export default YourOutfit;