import React, { Component } from 'react';
import Cards from './Cards.jsx';

class Carousels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="carousels">
        <Cards />
      </div>
    )
  }
}

export default Carousels;