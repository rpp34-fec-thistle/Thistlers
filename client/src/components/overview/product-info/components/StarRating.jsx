import React from 'react';
import PropTypes from 'prop-types';

import Star from './svg-icons/star-filled.svg';
import HalfStar from './svg-icons/star-half.svg';
import EmptyStar from './svg-icons/star-empty.svg';
import QuarterStar from './svg-icons/star-quarter-filled.svg';
import ThreeQuaterStar from './svg-icons/star-three-quarter-filled.svg';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgstars: ''
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.stars !== this.props.stars) {
      let avg = 0;
      let totalRates = 0;
      for(let star in this.props.stars) {
        avg = avg + (star * this.props.stars[star]);
        totalRates += +this.props.stars[star]
      }
      this.setState({
        avgstars: (avg/totalRates).toFixed(2)
      })
    }
  }

  render() {
    let stars = [];
    let avg = +this.state.avgstars;
    for(let i = 0; i < 5; i++) {
      if (avg > 1) {
        stars.push(<img className="avg-stars" src={Star}></img>)
        avg = avg - 1;
        continue;
      } else if (avg < 1) {
        if (avg > 0.5) {
          stars.push(<img className="avg-stars" src={ThreeQuaterStar}></img>)
          avg = avg - 1;
          continue;
        }
        if (avg < 0.5 && avg > 0) {
          stars.push(<img className="avg-stars" src={QuarterStar}></img>)
          avg = avg - 1;
          continue;
        }
        if (avg === 0.5) {
          stars.push(<img className="avg-stars" src={HalfStar}></img>)
          avg = avg - 1;
        }
      }
      stars.push(<img className="avg-stars" src={EmptyStar}></img>)
    }
    return(
      <div className="star-rating">
        {stars}
      </div>
    )
  }
}

StarRating.propTypes = {
  stars: PropTypes.object
}

export default StarRating;