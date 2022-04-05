import React, {Component} from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';

class QuestionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayedQuestions: []
    }
  }

  componentDidMount() {
    axios('/questions/64621')
    .then(results => {
      const questionData = results.data.results;
      this.setState({ questions: questionData });
      if (questionData.length >= 2) {
        const topTwoQuestions = questionData.slice(0, 2);
        this.setState({ displayedQuestions: topTwoQuestions })
      }


    })
    .catch(err => {
      console.error('err: ', err);
    })
  }

  render() {
    return (
      <div className="question-widget">
        <p>QUESTIONS & ANSWERS</p>
        <Search/>
        <QuestionList questions={this.state.displayedQuestions}/>
        <Footer />
      </div>
    )
  }
}

export default QuestionWidget;