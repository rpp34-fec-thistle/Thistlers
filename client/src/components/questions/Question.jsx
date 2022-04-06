import React from 'react';
import AnswerList from './AnswerList.jsx';
import PropTypes from 'prop-types';

const Question = ({ question, onShowMoreAnswersClick, onCollapseAnswersClick, allAnswersDisplayed }) => {

  const onMoreAnswersClick = () => {
    onShowMoreAnswersClick(question.question_id);
  }

  const onLessAnswersClick = () => {
    onCollapseAnswersClick(question.question_id);
  }

  let answers;
  let loadMoreAnswersDisplayed = false;

  if (allAnswersDisplayed.includes(question.question_id) || Object.keys(question.answers).length <= 2) {
    answers = question.answers;
  } else if (Object.keys(question.answers).length > 2) {
    answers = Object.fromEntries(Object.entries(question.answers).slice(0, 2));
    loadMoreAnswersDisplayed = true;
  }

  return (
    <div className="question">
      <div className="question-header">
        <p>Q: {question.question_body}</p>
        <div className="reaction-buttons">
          <p> Helpful? <span>Yes ({question.question_helpfulness})</span></p>
          <p className="reaction-button-break">|</p>
          <p> Add Answer</p>
        </div>
      </div>
      <div className="question-body">
        <p>A: </p>
        <AnswerList answers={answers}/>
      </div>
      <div className="question-footer">
        {loadMoreAnswersDisplayed
          ? <p onClick={onMoreAnswersClick}>LOAD MORE ANSWERS</p>
          : <p onClick={onLessAnswersClick}>COLLAPSE ANSWERS</p>}
      </div>
    </div>
  )
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  onShowMoreAnswersClick: PropTypes.func.isRequired,
  allAnswersDisplayed: PropTypes.array.isRequired,
  onCollapseAnswersClick: PropTypes.func.isRequired
};

export default Question;