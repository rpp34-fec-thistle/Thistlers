import React from 'react';
import PropTypes from 'prop-types';
import ReviewCount from './ReviewCount.jsx';
import ReviewList from './reviewList/ReviewList.jsx';
import ReviewInteractions from './ReviewInteractions.jsx';

// class CustomerReviews extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reviews: this.props.reviews,
//       totalReviews: this.props.totalReviews,
//       refresh: this.props.refresh
//     }
//   }
  
//   render() {
//     console.log('c.reviews', this.props.metadata);
//     return (
//       <div className="customer-reviews">
//           this is the customer reviews portion!
//           <ReviewCount totalReviews={this.state.totalReviews}/>
//           <ReviewList reviews={this.props.reviews}/>
//           <ReviewInteractions metadata={this.props.metadata} refresh={this.props.refresh}/>
//       </div>
//     );
//   }
// }

const CustomerReviews = props => {
  return (
    <div className="customer-reviews">
      <ReviewCount totalReviews={props.totalReviews}/>
      <ReviewList reviews={props.reviews}/>
      <ReviewInteractions productId={props.productId} metadata={props.metadata}/>
    </div>
  );
};

//PROPS
CustomerReviews.propTypes = {
  reviews: PropTypes.array,
  totalReviews: PropTypes.number,
  refresh: PropTypes.func,
  metadata: PropTypes.object,
  productId: PropTypes.number
};

export default CustomerReviews;

