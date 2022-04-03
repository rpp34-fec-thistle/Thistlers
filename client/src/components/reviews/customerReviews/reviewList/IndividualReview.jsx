import React, {Component} from 'react';

class IndividualStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 10
    };
  }

  render() {
    return (
      <div className="individual-review">
        <div className="indiv-reviews-star-and-date-display">
          <div className="indiv-review-stars">star1 star2 star3 star4 star5</div>
          <div className="indiv-review-date">
            @user, Jan, 1, 2019
          </div>
        </div>

        <div className="indiv-review-summary">
            This is a summary of this individual review!
        </div>

        <div className="indiv-review-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore tenetur mollitia impedit voluptas quae maiores libero ad? Dignissimos blanditiis ad iure, autem perferendis vel, veniam dolores necessitatibus enim magni molestiae. Cupiditate architecto earum exercitationem natus unde, sit corporis reprehenderit. Mollitia rerum eveniet voluptate dolorem, commodi aperiam beatae sit illum odio.
        </div>

        <div className="indiv-review-interaction">
          <span>Helpful?</span>
          <span><a href="#" className="indiv-review-interactions-yes-link">{`Yes(${this.state.upvotes})`}</a></span>
          <span>  |  </span>
          <span><a href="" className="indiv-review-interactions-report-link">Report</a></span>
        </div>

        <div className="hr"></div>
      </div>
    );
  }
}

export default IndividualStar;
