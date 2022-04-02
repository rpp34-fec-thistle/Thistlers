import React, {Component} from 'react';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
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
        <h2>QUESTIONS & ANSWERS</h2>
        <Search/>
        <QuestionsList />
        <Footer />
      </div>
    )
  }
}

export default QuestionWidget;