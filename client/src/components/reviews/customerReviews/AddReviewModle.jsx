import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NewReviewModle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.render) {
      return (
        <div className="new-review-modle">
          <button onClick = {this.props.toggleModle} className="btn-exit-new-review-modle">x</button>

          <form action="/newReview" id="new-review-form" method="post" encType="multipart/form-data">
            <input name="product_id" className="hidden-form-input-pId" type="text" value={this.props.productId} visibility="hidden" readOnly/>

            <div className="new-review-rating-container">
              <label htmlFor="rating">Rating</label>
              <select name="rating" form="new-review-form">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>

            <label className="new-review-label" htmlFor="username">Username</label>
            <input name="username" type="text" className="form-username" />

            <label className="new-review-label" htmlFor="email">Email</label>
            <input name="email" type="text" className="form-email" />

            <label className="new-review-label" htmlFor="summary">Summary</label>
            <input name="summary" type="text" className="form-summary" />

            <label className="new-review-label" htmlFor="body">Body</label>
            <input name="body" type="text" className="form-body" />

            <div className="new-review-recommend-container">
              <input name="recommend" type="checkbox" className="form-recommended" />
              <label htmlFor="form-recommended">I Recommend This Product</label>
            </div>

            <div className="new-review-add-image-container">
              <label htmlFor="rating">Add an Image</label>
              <input name="images" type="file" id="images" multiple className="form-images"/>
            </div>


            <div className="new-review-characteristics-container">
              <label className="characteristics-text-label" htmlFor="rating">Characteristics</label>

              <div className="characteristics-options">
                {Object.keys(this.props.metadata.characteristics).map((meta) => {
                  return (
                    <div key={JSON.stringify(meta)} id={`meta-${meta.toString()}`} >
                      <div className="meta-name">{meta}</div>
                      <select className="select-characteristic" name={this.props.metadata.characteristics[meta].id} id={`metaval-${meta}`} form="new-review-form">
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>

            <input className="new-review-submit" type="submit" />
          </form>
        </div>
      );
    }
    return <div></div>
  }
}

NewReviewModle.propTypes = {
  render: PropTypes.bool,
  toggleModle: PropTypes.func,
  metadata: PropTypes.object,
  productId: PropTypes.string,
  fetchReviews: PropTypes.func
};

export default NewReviewModle;