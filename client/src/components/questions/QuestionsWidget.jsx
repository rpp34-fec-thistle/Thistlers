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
      moreQuestions: false
    }
  }

  componentDidMount() {
    axios('/questions/64622')
    .then(results => {
      const qaData = results.data.results;
      const qaDataWithHiddedAnswers = qaData.map(question => {
        question['showAll'] = false;
        return question;
      })
      this.setState({ questions: qaDataWithHiddedAnswers });
      if (qaDataWithHiddedAnswers.length > 2) {
        const topTwoQuestions = qaDataWithHiddedAnswers.slice(0, 2);
        this.setState({ displayedQuestions: topTwoQuestions, numberDisplayed: 2, moreQuestions: true });
      } else {
        this.setState({ displayedQuestions: qaDataWithHiddedAnswers, numberDisplayed: qaDataWithHiddedAnswers.length, moreQuestions: false });
      }
    })
    .catch(err => {
      console.error('err: ', err);
    })
  }

  onShowMoreQuestionsClick() {
    const numberDisplayed = this.state.numberDisplayed;
    const newDisplayedQuestions = this.state.questions.slice(0, numberDisplayed + 2);
    if (this.state.questions.length <= numberDisplayed + 2) {
      this.setState({ displayedQuestions: newDisplayedQuestions, numberDisplayed: numberDisplayed + 2, moreQuestions: false });
    } else {
      this.setState({ displayedQuestions: newDisplayedQuestions, numberDisplayed: numberDisplayed + 2, moreQuestions: true });

    }
  }

  onShowMoreAnswersClick(questionID) {
    const updatedQaData = this.state.questions.map(question => {
      if (question.question_id === questionID) {
        question['showAll'] = true;
      }
      return question;
    })
    this.setState({ questions: updatedQaData });
  }

  render() {
    return (
      <div className="question-widget">
        <p>QUESTIONS & ANSWERS</p>
        <Search/>
        <QuestionList
          questions={this.state.displayedQuestions}
          onShowMoreAnswersClick={this.onShowMoreAnswersClick.bind(this)}
        />
        <Footer
          moreQuestions={this.state.moreQuestions}
          onShowMoreQuestionsClick={this.onShowMoreQuestionsClick.bind(this)}
        />
      </div>
    )
  }
}

export default QuestionWidget;