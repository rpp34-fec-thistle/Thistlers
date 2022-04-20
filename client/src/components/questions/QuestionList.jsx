import React from 'react';
import Question from './Question.jsx';
import PropTypes from 'prop-types';

const QuestionList = ({
    questions,
    onShowMoreAnswersClick,
    allAnswersDisplayed,
    onCollapseAnswersClick,
    onHelpfulClick,
    onReport,
    reportedAnswers,
    onAddAnswer
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
            onReport={onReport}
            reportedAnswers={reportedAnswers}
            onAddAnswer={onAddAnswer}
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
  onHelpfulClick: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  reportedAnswers: PropTypes.array.isRequired,
  onAddAnswer: PropTypes.func.isRequired
};

export default QuestionList;