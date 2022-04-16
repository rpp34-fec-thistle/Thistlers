import React, { Component } from 'react';
import helpers from './helpers.js';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }

  onSearchInputChange(e) {
    // this.setState({ searchInput: e.target.value })
    if (e.target.value.length > 2) {
      const filteredQuestions = helpers.filterQuestions(this.props.questions, e.target.value);
      console.log('fq: ', filteredQuestions);
    }
  }

  render() {
    return (
      <div className="question-search">
        <input onChange={this.onSearchInputChange.bind(this)} type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
      </div>
    )
  }
}


Search.propTypes = {
  questions: PropTypes.array.isRequired
}

export default Search;