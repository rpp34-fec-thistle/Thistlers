import React from 'react';
import AnswerList from './AnswerList.jsx';

const Question = () => {
  return (
    <div className="question">
      <h2>Q: [placeholder question text]</h2>
      <div className="question-helpful-add-answer">
        <div className="question-helpful">
          <p>Helpful?</p>
          <p>Yes (25)</p>
        </div>
        <div className="question-add-answer">
          <p>Add Answer</p>
        </div>
      </div>

      <AnswerList />
    </div>
  )
};

export default Question;