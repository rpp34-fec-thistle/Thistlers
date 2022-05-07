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
          <button onClick = {this.props.toggleModle} className="btn-exit-new-review-modle">Exit</button>

          <form action="/newReview" id="new-review-form" method="post" encType="multipart/form-data">
            <input name="product_id" className="hidden-form-input-pId" type="text" value={this.props.productId} visibility="hidden"/>
            <select name="rating" form="new-review-form">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            <input name="username" type="text" className="form-username" />
            <input name="email" type="text" className="form-email" />
            <input name="summary" type="text" className="form-summary" />
            <input name="body" type="text" className="form-body" />
            <input name="recommend" type="checkbox" className="form-recommended" />
            <label htmlFor="form-recommended">Recommend</label>
            <input name="images" type="file" id="images" multiple className="form-images"/>
            <div className="characteristics-options">

              {Object.keys(this.props.metadata.characteristics).map((meta) => {
                return (
                  <div key={JSON.stringify(meta)} id={`meta-${meta.toString()}`} >
                    <div className="meta-name">{meta}</div>
                    <select name={this.props.metadata.characteristics[meta].id} id={`metaval-${meta}`} form="new-review-form">
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
            <input type="submit" />
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