import React, { Component } from 'react';
import Cards from './Cards.jsx';


class YourOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourOutfitArr: []
    };
  }

  render() {
    return(
      <div className="yourOutfit">
        <Cards /><Cards /><Cards /><Cards />
      </div>
    )
  }
}

export default YourOutfit;