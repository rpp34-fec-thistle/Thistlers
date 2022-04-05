import React, { Component } from 'react';
import Carousels from './Carousels.jsx';

class YourOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="yourOutfit">
        <Carousels />
      </div>
    )
  }
}

export default YourOutfit;