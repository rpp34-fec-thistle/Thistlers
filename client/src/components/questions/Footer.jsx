import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import helpers from './helpers.js';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      nickname: "",
      email: ""
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
    ['nickname', 'email', 'question'].forEach(input => {
      document.querySelector(`.${input}-error-message`).style.visibility = 'hidden';
    })

    const validationErrors = helpers.validateForm(this.state);
    if (validationErrors.length > 0) {
      for (let i = 0; i < validationErrors.length; i++) {
        document.querySelector(`.${validationErrors[i]}-error-message`).style.visibility = 'visible';
      }
      return;
    }
    console.log('does this run?');
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
    document.querySelector('.add-question-modal').style.display = 'none';
  }

  onFormClose = () => {
    document.querySelector('.add-question-modal').style.display = 'none';
  }

  render() {
    return (
      <div className="question-footer">
        <div className="add-question-modal">
          <form className="add-question-form">
            <div className="close-modal-container">
              <p> </p>
              <div className="close-modal-contents">
                <p onClick={this.onFormClose} className="close-modal">X</p>
              </div>
            </div>
            <p className="add-question-title">Ask Your Question</p>
            <p className="add-question-subtitle">About the product <span className="product-name">{this.props.productName}</span></p>
            <div className="nickname-input form-input">
              <div>
                <p className="nickname-error-message error-message">You must enter the following:</p>
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
                <p className="email-error-message error-message">You must enter the following:</p>
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
            <div className="question-input form-input">
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
            <button className="submit-question-button" onClick={this.onQuestionSubmit}>Submit</button>
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
  updateQuestionState: PropTypes.func.isRequired
}

export default Footer;