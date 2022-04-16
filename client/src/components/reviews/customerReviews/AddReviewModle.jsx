import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class NewReviewModle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.render) {
      return (
        <div className="new-review-modle">
          <button onClick = {this.props.toggleModle} className="btn-exit-new-review-modle">Exit</button>
          <input placeholder = "5" type="text" className="review-rating-input" />
          <input placeholder = "summary" maxLength = "250" type="text" className="review-summary-input" />
          <input placeholder = "body" type="text" className="review-body-input" />
          <input type="checkbox" className="review-recommend-input" />
          <input placeholder = "username" type="text" className="review-name-input" />
          <input placeholder = "email" type="text" className="review-email-input" />
          <textarea name="" id="" cols="30" rows="10" className="review-photo-urls"></textarea>
          characteristics?
          <button onClick={this.sendNewReview} className="new-review-submit">Submit</button>
        </div>
      );
    }
    return <div></div>
  }

  sendNewReview() {
    var product_id = 1;
    var rating = parseInt(document.querySelector('.review-rating-input').value);
    var summary = document.querySelector('.review-summary-input').value;
    var body = document.querySelector('.review-body-input').value;
    var recommend = document.querySelector('.review-recommend-input').checked;
    var name = document.querySelector('.review-name-input').value;
    var email = document.querySelector('.review-email-input').value;
    // var photos = document.querySelector('.review-photo-urls').value;

    const reviewData =  {product_id, rating, summary, body, recommend, name, email, photos: [], characteristics: {}};
    axios({
      method: 'post',
      url: '/newReview',
      data: reviewData
    })
    .then(res => {
      console.log('res: ', res.data);
    })
    .catch(err => {
      console.log('err: ', err)
    });
  }
}

NewReviewModle.propTypes = {
  render: PropTypes.bool,
  toggleModle: PropTypes.func
};

export default NewReviewModle;