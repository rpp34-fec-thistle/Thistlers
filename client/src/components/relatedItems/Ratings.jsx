import React, { Component } from 'react';
import axios from 'axios';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null
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
          this.setState({
            ratings: averageScore
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
      <div className="ratings">
        {this.state.ratings}
      </div>
    )
  }
}

export default Ratings;



