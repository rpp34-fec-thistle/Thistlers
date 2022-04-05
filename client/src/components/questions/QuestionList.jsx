import React from 'react';
import Question from './Question.jsx';
import PropTypes from 'prop-types';

const QuestionList = ({ questions, onShowMoreAnswersClick }) => {
  return (
    <div className="question-list">
      {questions.map(question => {
        return <Question question={question} key={question.question_id} onShowMoreAnswersClick={onShowMoreAnswersClick}/>;
      })}
    </div>
  )
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onShowMoreAnswersClick: PropTypes.func.isRequired
};

export default QuestionList;