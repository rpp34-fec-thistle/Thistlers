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
    this.state = {};
  }

  render() {
    return(
      <>
      <Overview/>
      {/* <RelatedItems/> */}
      {/* <Questions/> */}
      {/* <Reviews/> */}
      </>
    )
  }
}

export default App;