import React, { Component } from 'react';
import Overview from './overview/Overview.jsx'
import '../../public/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <>
      <h1>Hello World!</h1>
      <Overview/>
      </>
    )
  }
}

export default App;