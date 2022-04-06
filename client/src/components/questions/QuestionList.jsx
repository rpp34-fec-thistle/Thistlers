import React from 'react';
import Question from './Question.jsx';
import PropTypes from 'prop-types';

const QuestionList = ({
    questions,
    onShowMoreAnswersClick,
    allAnswersDisplayed,
    onCollapseAnswersClick,
    onHelpfulClick
   }) => {
  return (
    <div className="question-list">
      {questions.map(question => {
        return (
          <Question
            question={question}
            key={question.question_id}
            onShowMoreAnswersClick={onShowMoreAnswersClick}
            allAnswersDisplayed={allAnswersDisplayed}
            onCollapseAnswersClick={onCollapseAnswersClick}
            onHelpfulClick={onHelpfulClick}
          />
        )
      })}
    </div>
  )
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onShowMoreAnswersClick: PropTypes.func.isRequired,
  allAnswersDisplayed: PropTypes.array.isRequired,
  onCollapseAnswersClick: PropTypes.func.isRequired,
  onHelpfulClick: PropTypes.func.isRequired
};

export default QuestionList;