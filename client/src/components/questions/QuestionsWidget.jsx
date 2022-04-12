import React, {Component} from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';

const testProductId = 64635;

class QuestionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayedQuestions: [],
      numberDisplayed: 0,
      moreQuestions: false,
      allAnswersDisplayed: [],
      reportedAnswers: []
    }
  }



  componentDidMount() {
    axios(`/questions/${testProductId}`)
    .then(results => {
      const qaData = results.data.results;
      this.setState({ questions: qaData });
      if (qaData.length > 2) {
        const topTwoQuestions = qaData.slice(0, 2);
        this.setState({ displayedQuestions: topTwoQuestions, numberDisplayed: 2, moreQuestions: true });
      } else {
        this.setState({ displayedQuestions: qaData, numberDisplayed: qaData.length, moreQuestions: false });
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

  onShowMoreAnswersClick(questionId) {
    this.setState({ allAnswersDisplayed: [...this.state.allAnswersDisplayed, questionId] });
  }

  onCollapseAnswersClick(questionId) {
    this.setState({ allAnswersDisplayed: this.state.allAnswersDisplayed.filter(id => {
      return id !== questionId;
    })})
  }

  onHelpfulClick(type, id) {
    axios({
      url: `/${type}/${id}/helpful`,
      method: 'put'
    })
    .then(() => {
      axios(`/questions/${testProductId}`)
      .then(results => {
        const qaData = results.data.results;
        const displayedQaData = qaData.slice(0, this.state.numberDisplayed);
        this.setState({ displayedQuestions: displayedQaData })
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  onReport(type, id) {
    axios({
      url: `/${type}/${id}/report`,
      method: 'put'
    })
    .then(() => {
      this.setState({ reportedAnswers: [...this.state.reportedAnswers, id]})
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return (
      <div className="question-widget">
        <p>QUESTIONS & ANSWERS</p>
        <Search/>
        <QuestionList
          questions={this.state.displayedQuestions}
          onShowMoreAnswersClick={this.onShowMoreAnswersClick.bind(this)}
          allAnswersDisplayed={this.state.allAnswersDisplayed}
          onCollapseAnswersClick={this.onCollapseAnswersClick.bind(this)}
          onHelpfulClick={this.onHelpfulClick.bind(this)}
          onReport={this.onReport.bind(this)}
          reportedAnswers={this.state.reportedAnswers}
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