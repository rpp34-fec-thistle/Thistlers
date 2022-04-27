import React, { Component } from 'react';
import Overview from './overview/Overview.jsx'
import Reviews from './reviews/Reviews.jsx';
import Questions from './questions/QuestionsWidget.jsx';
import RelatedItems from './relatedItems/RelatedItemsWidget.jsx'
import '../../public/style.css';
import '../../public/reviews/style.css';
import '../../public/relatedItems/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '64620'
    };
    this.changeId = this.changeId.bind(this);
  }

  changeId(id) {
    this.setState({product_id: id});
  }

  render() {
    return(
      <>
      <Overview product_id={this.state.product_id}/>
      <RelatedItems
        changeOverviewId={this.changeId}
        overviewId={this.state.product_id}/>
      <Questions product_id={this.state.product_id}/>
      <Reviews product_id={this.state.product_id}/>
      </>
    )
  }
}

export default App;