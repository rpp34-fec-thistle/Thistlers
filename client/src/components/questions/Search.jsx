import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }
  render() {
    return (
      <div className="question-search">
        <form>
          <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
        </form>
      </div>
    )
  }
}

export default Search;