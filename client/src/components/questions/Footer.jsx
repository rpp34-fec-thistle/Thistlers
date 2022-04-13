import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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

  onQuestionSubmit = () => {
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
              <p onClick={this.onFormClose} className="close-modal">x</p>
            </div>
            <p className="add-question-title">Ask Your Question</p>
            <p className="add-question-subtitle">About the product <span className="product-name">{this.props.productName}</span></p>
            <div className="nickname-input form-input">
              <div>
                <label htmlFor="nickname">nickname</label>
              </div>
              <input
                type="text"
                id="nickname"
                name="nickname"
                onChange={this.onChangeInput}
                placeholder="Example: jackson11!"
                >
                </input>
            </div>
            <div className="nickname-input form-input">
              <div>
                <label htmlFor="email">email</label>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                onChange={this.onChangeInput}
                placeholder="sample@email.com"
                >
                </input>
            </div>
            <div className="question-input form-input">
              <label htmlFor="question"></label>
              <textarea
                type="text"
                id="question"
                name="question"
                onChange={this.onChangeInput}
                placeholder="What would you like to know about this product?"
              >
              </textarea>
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