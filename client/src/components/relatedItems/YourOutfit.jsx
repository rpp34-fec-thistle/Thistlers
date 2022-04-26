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
    this.addToOutfits = this.addToOutfits.bind(this);
  }

  componentDidMount() {
    this.setYourOutfits()
  }

  setYourOutfits() {
    if (window.localStorage.yourOutfits) {
      let testArray = window.localStorage.getItem('yourOutfits');
      testArray = testArray.split(',').map(x => parseInt(x));
      this.setState({
        yourOutfitIds: testArray
      })
    } else {
      window.localStorage.setItem('yourOutfits', []);
    }
  }

  getYourOutfits(){
    JSON.parse(window.localStorage.getItem('yourOutfits'));
  }

  deleteYourOutfits(id) {
    if (this.state.yourOutfitIds.length === 1) {
      window.localStorage.clear();
      window.localStorage.setItem('yourOutfits', []);
      this.setState({
        yourOutfitIds: []
      })
    } else {
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
  }

  addToOutfits(id) {
    let originalArray = this.state.yourOutfitIds;
    if (window.localStorage.yourOutfits === '') {
      let newArray = [id]
      this.setState({
        yourOutfitIds: newArray
      })
      window.localStorage.setItem('yourOutfits', [id]);
    } else {
      let newArray = [...new Set([id, ...originalArray])];
      this.setState({
        yourOutfitIds: newArray
      })
      window.localStorage.setItem('yourOutfits', this.state.yourOutfitIds);
    }
  }

  render() {

      const items = this.state.yourOutfitIds;

      return(
        <>
        <div className="your-outfit-container">
          <h3>Your Outfit</h3>
          <div className="your-outfit-carousel" data-testid="your-outfit-id">

          <div className="card" data-testid='test-id' id={this.props.id}>


            <button onClick={() => this.addToOutfits(this.props.overviewId)} className="add-to-outfits">Add This Item to Your Outfit List</button>

          </div>

            {items.map((eachId) =>
              <Cards key={'yo-' + eachId} displayButton={'your-outfit'} id={eachId} overviewId={this.props.overviewId} setOverviewId={this.props.setOverviewId} deleteYourOutfits={this.deleteYourOutfits}/>
            )}
          </div>
        </div>
        </>
    )
  }
}

YourOutfit.propTypes = {
  overviewId: PropTypes.number,
  setOverviewId: PropTypes.func,
  id: PropTypes.number
}

export default YourOutfit;