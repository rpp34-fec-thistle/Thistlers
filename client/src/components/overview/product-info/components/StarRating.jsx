import React from 'react';
import PropTypes from 'prop-types';

import Star from './svg-icons/star-filled.svg';
import HalfStar from './svg-icons/star-half.svg';
import EmptyStar from './svg-icons/star-empty.svg';
import QuarterStar from './svg-icons/star-quarter-filled.svg';
import ThreeQuaterStar from './svg-icons/star-three-quarter-filled.svg';

function StarRating(props){
  let avg = 0;
  let totalRates = 0;
  for(let star in props.stars) {
    avg = avg + (star * props.stars[star]);
    totalRates += +props.stars[star]
  }
  avg = (avg/totalRates).toFixed(2)

  let stars = [];
  for(let i = 0; i < 5; i++) {
    if (avg > 1 || avg === 1) {
      stars.push(<img alt="full-star" key={`star-${i}`}className="avg-stars" src={Star}></img>)
      avg = avg - 1;
      continue;
    } else if (avg < 1) {
      if (avg > 0.5) {
        stars.push(<img alt="three-quarter-star" key={`star-${i}`} className="avg-stars" src={ThreeQuaterStar}></img>)
        avg = avg - 1;
        continue;
      }
      if (avg < 0.5 && avg > 0) {
        stars.push(<img alt="quarter-star" key={`star-${i}`} className="avg-stars" src={QuarterStar}></img>)
        avg = avg - 1;
        continue;
      }
      if (avg === 0.5) {
        stars.push(<img alt="half-star" key={`star-${i}`} className="avg-stars" src={HalfStar}></img>)
        avg = avg - 1;
        continue
      }
    }
    stars.push(<img alt="empty-star" key={`star-${i}`} className="avg-stars" src={EmptyStar}></img>)
  }

  let scrollToReviews = () => {
    let e = document.getElementsByClassName('reviews-container');
    e[0].scrollIntoView();
  }

  return(
    <div className="star-rating">
      {stars} <p className="scroll-to-reviews" onClick={scrollToReviews}>Read all reviews</p>
    </div>
  )
}

StarRating.propTypes = {
  stars: PropTypes.object
}

export default StarRating;