import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import fullStar from './Stars/fullStar.svg';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null,
      starRatings: ''
    }
    this.setRatings = this.setRatings.bind(this);
  }

  componentDidMount() {
    this.setRatings()
  }

  setRatings() {

    const ratingsAPI = `http://localhost:8080/reviews/${this.props.id}`;

    axios(ratingsAPI)
      .then((data) => {
        var result = data.data.ratings;
        var hasRatings = Object.keys(result).length > 0;
        if (hasRatings) {
          var ratingsArr = Object.entries(result);
          var totalScore = 0;
          for (var i = 0; i < ratingsArr.length; i++) {
            var currentPair = ratingsArr[i];
            var score = parseInt(currentPair[0]);
            var votes = parseInt(currentPair[1]);
            var pairTotal = score * votes;
            totalScore += pairTotal;
          }
          var totalRatings = Object.values(result).map(x => parseInt(x)).reduce((a, b) => a + b, 0);
          var averageScore = Math.round((totalScore / totalRatings) * 100) / 100;

          var numWholeStars = Math.floor(averageScore);
          var remainderStars = averageScore - numWholeStars;

          var addWholeStar = remainderStars > .875;
          var addThreeQuarterStar = remainderStars < .875 && remainderStars > .625;
          var addHalfStar = remainderStars < .625 && remainderStars > .37;
          var addQuarterStar = remainderStars < .37 && remainderStars > .125;
          var addNoStar = remainderStars < .125;

          console.log('rating: ', numWholeStars, addWholeStar, addThreeQuarterStar, addHalfStar, addQuarterStar, addNoStar);

          var starString = '';

          if (numWholeStars === 1) {
            starString = '★☆☆☆☆'
          }
          if (numWholeStars === 2) {
            starString = '★★☆☆☆'
          }
          if (numWholeStars === 3) {
            starString = '★★★☆☆'
          }
          if (numWholeStars === 4) {
            starString = '★★★★☆'
          }
          if (numWholeStars === 5) {
            starString = '★★★★★'
          }
          console.log(starString);

          this.setState({
            ratings: averageScore,
            starRatings: starString
          });
        }
        return result;
      })
      .catch((err) => {
        console.log('error in setRelatedProductsIds');
        return err;
      })

  }



  render() {

    return (
      <>
      <div className="ratings" data-testid='ratings-id'>
        {this.state.starRatings}
        {/* {this.state.ratings} */}
      </div>
      </>
    )

  }
}

Ratings.propTypes = {
  id: PropTypes.number
}

export default Ratings;




