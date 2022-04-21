import React, { Component } from 'react';
import Cards from './Cards.jsx';
import PropTypes from 'prop-types';


class YourOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourOutfitIds: []
    }
    this.setYourOutfits = this.setYourOutfits.bind(this);
    this.getYourOutfits = this.getYourOutfits.bind(this);
    this.deleteYourOutfits = this.deleteYourOutfits.bind(this);
  }

  componentDidMount() {
    this.setYourOutfits()
  }

  setYourOutfits() {
    window.localStorage.clear();
    window.localStorage.setItem('yourOutfits', [64624, 64628, 64626, 64621, 64620]);
    let testArray = window.localStorage.getItem('yourOutfits');
    testArray = testArray.split(',').map(x => parseInt(x));
    this.setState({
      yourOutfitIds: testArray
    })
  }

  getYourOutfits(){
    JSON.parse(window.localStorage.getItem('yourOutfits'));
  }

  deleteYourOutfits(e) {
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
        <div className="your-outfit-carousel" data-testid="your-outfit-id">
          {items.map((eachId) =>
            <Cards key={eachId} displayButton={'your-outfit'} id={eachId} overviewId={this.props.overviewId} setOverviewId={this.props.setOverviewId} deleteYourOutfits={this.deleteYourOutfits}/>
          )}
        </div>
        </>
    )
  }
}

YourOutfit.propTypes = {
  overviewId: PropTypes.number,
  setOverviewId: PropTypes.func
}

export default YourOutfit;