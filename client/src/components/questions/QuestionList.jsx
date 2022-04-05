import React from 'react';
import Question from './Question.jsx';
import PropTypes from 'prop-types';

const QuestionList = ({ questions }) => {
  return (
    <div className="question-list">
      {questions.map(question => {
        return <Question question={question} key={question.question_id}/>;
      })}
    </div>
  )
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired
};

export default QuestionList;