import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class NewReviewModle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: this.parseMetadata(props.metadata)
    }
  }

  render() {
    // console.log(this.parseMetadata(this.props.metadata));
    // console.log("newReviewModle: " ,this.props.metadata);
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

          {Object.keys(this.props.metadata.characteristics).map(meta => {
            return (
              // <div key={JSON.stringify(meta)} className="meta">{meta}: {this.props.metadata.characteristics[meta].id}</div>

              <div key={JSON.stringify(meta)} id={`meta-${meta.toString()}`} >
                <div className="meta-name">{meta}</div>
                <select name="" id={`metaval-${meta}`}>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </div>

            )
          })}

          <button onClick={() => this.sendNewReview.call(this)} className="new-review-submit">Submit</button>
        </div>
      );
    }
    return <div></div>
  }

  sendNewReview() {
    var product_id = this.props.productId;
    var rating = parseInt(document.querySelector('.review-rating-input').value);
    var summary = document.querySelector('.review-summary-input').value;
    var body = document.querySelector('.review-body-input').value;
    var recommend = document.querySelector('.review-recommend-input').checked;
    var name = document.querySelector('.review-name-input').value;
    var email = document.querySelector('.review-email-input').value;
    var photos = document.querySelector('.review-photo-urls').value;
    var characteristics = {};

    for (var x in this.props.metadata.characteristics) {
      characteristics[this.props.metadata.characteristics[x].id] = parseInt(document.getElementById(`metaval-${x}`).value); 
    }

    const reviewData =  {product_id, rating, summary, body, recommend, name, email, photos, characteristics};
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

  parseMetadata(obj) {
    var result = [];
    for (var x in obj.characteristics) {
      var insert = {};
      insert.key = x;
      insert.id = obj.characteristics[x].id;
      result.push(insert);
    }
    return result;
  }
}

NewReviewModle.propTypes = {
  render: PropTypes.bool,
  toggleModle: PropTypes.func,
  metadata: PropTypes.object,
  productId: PropTypes.number
};

export default NewReviewModle;