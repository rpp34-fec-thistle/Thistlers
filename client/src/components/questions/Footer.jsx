import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import helpers from './helpers.js';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answer: "",
      nickname: "",
      email: "",
      photos: ""
    }
  }

  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onQuestionAdd = () => {
    document.querySelector('.add-question-modal').style.display = 'flex';
  }

  onQuestionSubmit = (e) => {
    e.preventDefault();
    ['question-nickname', 'question-email', 'question'].forEach(input => {
      document.querySelector(`.${input}-error-message`).style.visibility = 'hidden';
    })

    const validationErrors = helpers.validateQuestionForm(this.state.question, this.state.nickname, this.state.email);
    if (validationErrors.length > 0) {
      for (let i = 0; i < validationErrors.length; i++) {
        document.querySelector(`.${validationErrors[i]}-error-message`).style.visibility = 'visible';
      }
      return;
    }
    axios({
      url: '/questions',
      method: 'post',
      data: {
        body: this.state.question,
        name: this.state.nickname,
        email: this.state.email,
        product_id: this.props.productId
      }
    })
    .then(() => {
      this.props.updateQuestionState();
    })
    .catch(err => {
      console.error('err ', err);
    })
    document.querySelector('.question-form').reset();
    document.querySelector('.add-question-modal').style.display = 'none';
    this.setState({
      question: "",
      answer: "",
      nickname: "",
      email: "",
      photos: ""
    })
  }

  onAnswerSubmit = (e) => {
    e.preventDefault();
    ['answer-nickname', 'answer-email', 'answer'].forEach(input => {
      document.querySelector(`.${input}-error-message`).style.visibility = 'hidden';
    })

    const validationErrors = helpers.validateAnswerForm(this.state.answer, this.state.nickname, this.state.email);
    if (validationErrors.length > 0) {
      for (let i = 0; i < validationErrors.length; i++) {
        document.querySelector(`.${validationErrors[i]}-error-message`).style.visibility = 'visible';
      }
      return;
    }
    axios({
      url: `/questions/${this.props.selectedQuestion.question_id}/answers`,
      method: 'post',
      data: {
        body: this.state.answer,
        name: this.state.nickname,
        email: this.state.email
      }
    })
    .then(() => {
      this.props.updateQuestionState();
    })
    .catch(err => {
      console.error('err ', err);
    })
    document.querySelector('.answer-form').reset();
    document.querySelector('.add-answer-modal').style.display = 'none';
    this.setState({
      question: "",
      answer: "",
      nickname: "",
      email: "",
      photos: ""
    })
  }

  onQuestionFormClose = () => {
    document.querySelector('.add-question-modal').style.display = 'none';
    ['question-nickname', 'question-email', 'question'].forEach(input => {
      document.querySelector(`.${input}-error-message`).style.visibility = 'hidden';
    })
  }

  onAnswerFormClose = () => {
    document.querySelector('.add-answer-modal').style.display = 'none';
    ['answer-nickname', 'answer-email', 'answer'].forEach(input => {
      document.querySelector(`.${input}-error-message`).style.visibility = 'hidden';
    })
  }

  render() {
    return (
      <div className="question-footer">
        <div className="add-question-modal">
        <form className="add-qa-form question-form">
          <div className="close-modal-container">
            <p> </p>
            <div className="close-modal-contents">
              <p onClick={this.onQuestionFormClose} className="close-modal">X</p>
            </div>
          </div>
          <p className="add-qa-title">Ask Your Question</p>
          <p className="add-question-subtitle">About the product <span className="add-question-product-name">{this.props.productName}</span></p>
          <div className="nickname-input form-input">
            <div>
              <p className="question-nickname-error-message error-message">You must enter the following:</p>
              <label htmlFor="nickname">Nickname *</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="nickname"
                name="nickname"
                onChange={this.onChangeInput}
                placeholder="Example: jackson11!"
                maxLength="60"
                >
                </input>
                <p className="form-message">For privacy reasons, do not use your full name or email address</p>

            </div>
          </div>
          <div className="email-input form-input">
            <div>
              <p className="question-email-error-message error-message">You must enter the following:</p>
              <label htmlFor="email">Email *</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="email"
                name="email"
                onChange={this.onChangeInput}
                placeholder="sample@email.com"
                maxLength="60"
                >
              </input>
              <p className="form-message">For authentication reasons, you will not be emailed</p>
            </div>
          </div>
          <div className="qa-input form-input">
            <div>
              <p className="question-error-message error-message">You must enter the following:</p>
              <label htmlFor="question">Question *</label>
            </div>
            <div className="input-container">
              <textarea
                type="text"
                id="question"
                name="question"
                onChange={this.onChangeInput}
                placeholder="What would you like to know about this product?"
                maxLength="1000"
              >
              </textarea>
            </div>
          </div>
          <button className="submit-qa-button" onClick={this.onQuestionSubmit}>Submit</button>
        </form>
      </div>

        <div className="add-answer-modal">
          <form className="add-qa-form answer-form">
            <div className="close-modal-container">
              <p> </p>
              <div className="close-modal-contents">
                <p onClick={this.onAnswerFormClose} className="close-modal">X</p>
              </div>
            </div>
            <p className="add-qa-title">Submit Your Answer</p>
            <p className="add-answer-product-name">{this.props.productName} <span className="add-answer-subtitle">{this.props.selectedQuestion.question_body}</span></p>
            <div className="nickname-input form-input">
              <div>
                <p className="answer-nickname-error-message error-message">You must enter the following:</p>
                <label htmlFor="nickname">Nickname *</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  onChange={this.onChangeInput}
                  placeholder="Example: jackson11!"
                  maxLength="60"
                  >
                  </input>
                  <p className="form-message">For privacy reasons, do not use your full name or email address</p>

              </div>
            </div>
            <div className="email-input form-input">
              <div>
                <p className="answer-email-error-message error-message">You must enter the following:</p>
                <label htmlFor="email">Email *</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={this.onChangeInput}
                  placeholder="sample@email.com"
                  maxLength="60"
                  >
                </input>
                <p className="form-message">For authentication reasons, you will not be emailed</p>
              </div>
            </div>
            <div className="qa-input form-input">
              <div>
                <p className="answer-error-message error-message">You must enter the following:</p>
                <label htmlFor="answer">Answer *</label>
              </div>
              <div className="input-container">
                <textarea
                  type="text"
                  id="answer"
                  name="answer"
                  onChange={this.onChangeInput}
                  placeholder="Write your answer here"
                  maxLength="1000"
                >
                </textarea>
              </div>
            </div>
            <button className="submit-qa-button" onClick={this.onAnswerSubmit}>Submit</button>
          </form>
        </div>
        {this.props.moreQuestions && <button onClick={this.props.onShowMoreQuestionsClick} className="more-questions-btn">MORE ANSWERED QUESTIONS</button>}
        <button onClick={this.onQuestionAdd} className="add-question-btn">ADD A QUESTION +</button>
      </div>
    )
  }
}

Footer.propTypes = {
  onShowMoreQuestionsClick: PropTypes.func.isRequired,
  moreQuestions: PropTypes.bool.isRequired,
  productName: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
  updateQuestionState: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.object.isRequired
}

export default Footer;