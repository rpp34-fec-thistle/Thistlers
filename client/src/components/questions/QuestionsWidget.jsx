import React, {Component} from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import Footer from './Footer.jsx';

class QuestionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayedQuestions: []
    }
  }
  render() {
    return (
      <div className="question-widget">
        <p>QUESTIONS & ANSWERS</p>
        <Search/>
        <QuestionList />
        <Footer />
      </div>
    )
  }
}

export default QuestionWidget;