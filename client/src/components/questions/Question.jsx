import React from 'react';
import AnswerList from './AnswerList.jsx';
import PropTypes from 'prop-types';

const Question = ({ question }) => {
  return (
    <div className="question">
      <p>Q: {question.question_body}</p>
      <AnswerList answers={question.answers}/>
    </div>
  )
};

Question.propTypes = {
  question: PropTypes.object.isRequired
};

export default Question;