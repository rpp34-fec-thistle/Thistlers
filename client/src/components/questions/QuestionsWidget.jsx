import React, {Component} from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';
import helpers from './helpers.js';
import PropTypes from 'prop-types';

class QuestionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayedQuestions: [],
      numberDisplayed: 2,
      moreQuestions: false,
      allAnswersDisplayed: [],
      reportedAnswers: [],
      selectedQuestion: {},
      currentImage: '',
      productName: ''
    }
  }

  componentDidMount() {
    this.setOrderedData();
    this.getProductName();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product_id !== this.props.product_id) {
      this.setOrderedData();
      this.getProductName();
    }
  }

  getProductName() {
    helpers.getProductName(this.props.product_id, (err, results) => {
      if (err) {
        console.error('An error occured fetching product name: ', err);
      } else {
        if (results.data.name) {
          this.setState({productName: results.data.name});
        }
      }
    })
  }

  setOrderedData() {
    helpers.orderData(this.props.product_id, (err, results) => {
      if (err) {
        console.error('An error occured fetching the data: ', err);
      } else {
        this.setState({ questions: results })
        if (results.length > 2) {
          const topTwoQuestions = results.slice(0, 2);
          this.setState({ displayedQuestions: topTwoQuestions, numberDisplayed: 2, moreQuestions: true });
        } else {
          this.setState({ displayedQuestions: results, numberDisplayed: results.length, moreQuestions: false });
        }
      }
    })
  }

  onShowMoreQuestionsClick() {
    const numberDisplayed = this.state.numberDisplayed;
    const totalQuestions = this.state.questions.length;
    let numberToAdd;
    let moreQuestionsLeft;

    if (numberDisplayed + 2 < totalQuestions) {
      numberToAdd = 2;
      moreQuestionsLeft = true;
    } else if (numberDisplayed + 2 === totalQuestions) {
      numberToAdd = 2;
      moreQuestionsLeft = false;
    } else if (numberDisplayed + 1 === totalQuestions) {
      numberToAdd = 1;
      moreQuestionsLeft = false;
    } else {
      numberToAdd = 0;
      moreQuestionsLeft = false;
    }
    const newDisplayedQuestions = this.state.questions.slice(0, numberDisplayed + numberToAdd);
      this.setState({ displayedQuestions: newDisplayedQuestions, numberDisplayed: numberDisplayed + numberToAdd, moreQuestions: moreQuestionsLeft });
  }

  onShowMoreAnswersClick(questionId) {
    this.setState({ allAnswersDisplayed: [...this.state.allAnswersDisplayed, questionId] });
  }

  onCollapseAnswersClick(questionId) {
    this.setState({ allAnswersDisplayed: this.state.allAnswersDisplayed.filter(id => {
      return id !== questionId;
    })})
  }

  updateQuestionState() {
    helpers.orderData(this.props.product_id, (err, results) => {
      if (err) {
        console.error('An error occured fetching the data: ', err);
      } else {
        const newDisplayedData = results.slice(0, this.state.numberDisplayed);
        this.setState({ questions: results, displayedQuestions: newDisplayedData })
      }
    })
  }

  onHelpfulClick(type, id) {
    axios({
      url: `/${type}/${id}/helpful`,
      method: 'put'
    })
    .then(() => {
      this.updateQuestionState();
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

  onSearch(filteredQuestions, clearSearch) {
    if (clearSearch) {
      this.setState({ displayedQuestions: this.state.questions.slice(0, this.state.numberDisplayed) })
    } else {
      this.setState({ displayedQuestions: filteredQuestions });
    }
  }

  onAddAnswer(question) {
    this.setState({ selectedQuestion: question });
  }

  onImageClick(imageUrl, reset) {
    if (reset) {
      this.setState({currentImage: ''})
    } else {
      this.setState({currentImage: imageUrl});
    }
  }

  render() {
    return (
      <div className="question-widget-container">
        <div className="question-widget">
          <p className="question-widget-title">QUESTIONS & ANSWERS</p>
          {this.state.questions.length > 0 && (
            <>
              <Search
              questions={this.state.questions}
              onSearch={this.onSearch.bind(this)}
              />
              <QuestionList
                questions={this.state.displayedQuestions}
                onShowMoreAnswersClick={this.onShowMoreAnswersClick.bind(this)}
                allAnswersDisplayed={this.state.allAnswersDisplayed}
                onCollapseAnswersClick={this.onCollapseAnswersClick.bind(this)}
                onHelpfulClick={this.onHelpfulClick.bind(this)}
                onReport={this.onReport.bind(this)}
                reportedAnswers={this.state.reportedAnswers}
                onAddAnswer={this.onAddAnswer.bind(this)}
                onImageClick={this.onImageClick.bind(this)}
                currentImage={this.state.currentImage}
              />
            </>
          )}
          <Footer
            moreQuestions={this.state.moreQuestions}
            onShowMoreQuestionsClick={this.onShowMoreQuestionsClick.bind(this)}
            productName={this.state.productName}
            productId={this.props.product_id}
            updateQuestionState={this.updateQuestionState.bind(this)}
            selectedQuestion={this.state.selectedQuestion}
          />
        </div>
      </div>
    )
  }
}

QuestionWidget.propTypes = {
  product_id: PropTypes.string.isRequired
}

export default QuestionWidget;