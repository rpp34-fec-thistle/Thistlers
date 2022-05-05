import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ratings extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var result = this.props.ratings;
    var numWholeStars = Math.floor(result);
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

    return (
      <>
        <div className="ratings" data-testid='ratings-id' id={'rating-' + this.props.id}>
          {starString}
        </div>
      </>
    )

  }
}

Ratings.propTypes = {
  id: PropTypes.number,
  ratings: PropTypes.number
}

export default Ratings;




     // var remainderStars = averageScore - numWholeStars;

          // var addWholeStar = remainderStars > .875;
          // var addThreeQuarterStar = remainderStars < .875 && remainderStars > .625;
          // var addHalfStar = remainderStars < .625 && remainderStars > .37;
          // var addQuarterStar = remainderStars < .37 && remainderStars > .125;
          // var addNoStar = remainderStars < .125;

      // console.log('rating: ', numWholeStars, addWholeStar, addThreeQuarterStar, addHalfStar, addQuarterStar, addNoStar);
