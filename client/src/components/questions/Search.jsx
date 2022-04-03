import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }

  render() {
    return (
      <div className="question-search">
        <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
      </div>
    )
  }
}

export default Search;