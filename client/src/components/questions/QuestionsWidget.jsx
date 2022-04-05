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
      numberDisplayed: 0,
      showMoreQuestionsVisible: false
    }
  }

  componentDidMount() {
    axios('/questions/64626')
    .then(results => {
      const questionData = results.data.results;
      this.setState({ questions: questionData });
      if (questionData.length > 2) {
        const topTwoQuestions = questionData.slice(0, 2);
        this.setState({ displayedQuestions: topTwoQuestions, numberDisplayed: 2, showMoreQuestionsVisible: true });
      } else {
        this.setState({ displayedQuestions: questionData, numberDisplayed: questionData.length, showMoreQuestionsVisible: false });
      }
    })
    .catch(err => {
      console.error('err: ', err);
    })
  }

  onShowMoreQuestionsClick() {
    const numberDisplayed = this.state.numberDisplayed;
    const newDisplayedQuestions = this.state.questions.slice(0, numberDisplayed + 2);
    console.log('questions.length: ', this.state.questions.length);
    console.log('number displayed: ', numberDisplayed);
    if (this.state.questions.length <= numberDisplayed + 2) {
      this.setState({ displayedQuestions: newDisplayedQuestions, numberDisplayed: numberDisplayed + 2, showMoreQuestionsVisible: false });
    } else {
      this.setState({ displayedQuestions: newDisplayedQuestions, numberDisplayed: numberDisplayed + 2, showMoreQuestionsVisible: true });

    }
  }

  render() {
    return (
      <div className="question-widget">
        <p>QUESTIONS & ANSWERS</p>
        <Search/>
        <QuestionList questions={this.state.displayedQuestions}/>
        <Footer showMoreQuestionsVisible={this.state.showMoreQuestionsVisible} onShowMoreQuestionsClick={this.onShowMoreQuestionsClick.bind(this)}/>
      </div>
    )
  }
}

export default QuestionWidget;