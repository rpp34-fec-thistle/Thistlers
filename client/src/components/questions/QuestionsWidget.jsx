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
      displayedQuestions: [],
      numberDisplayed: 0
    }
  }

  componentDidMount() {
    axios('/questions/64621')
    .then(results => {
      const questionData = results.data.results;
      this.setState({ questions: questionData });
      if (questionData.length >= 2) {
        const topTwoQuestions = questionData.slice(0, 2);
        this.setState({ displayedQuestions: topTwoQuestions, numberDisplayed: 2 });
      } else {
        this.setState({ displayedQuestions: questionData, numberDisplayed: questionData.length });
      }
    })
    .catch(err => {
      console.error('err: ', err);
    })
  }

  onShowMoreQuestionsClick() {
    const numberDisplayed = this.state.numberDisplayed;
    const newDisplayedQuestions = this.state.questions.slice(0, numberDisplayed + 2);
    this.setState({ displayedQuestions: newDisplayedQuestions, numberDisplayed: numberDisplayed + 2 });
  }

  render() {
    return (
      <div className="question-widget">
        <p>QUESTIONS & ANSWERS</p>
        <Search/>
        <QuestionList questions={this.state.displayedQuestions}/>
        <Footer onShowMoreQuestionsClick={this.onShowMoreQuestionsClick.bind(this)}/>
      </div>
    )
  }
}

export default QuestionWidget;