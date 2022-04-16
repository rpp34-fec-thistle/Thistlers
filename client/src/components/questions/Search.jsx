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
    if (e.target.value.length > 2) {
      const filteredQuestions = helpers.filterQuestions(this.props.questions, e.target.value);
      this.props.onSearch(filteredQuestions);
    } else {
      this.props.onSearch(null, true);
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
  questions: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default Search;