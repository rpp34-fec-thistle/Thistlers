import React from 'react';
import AnswerList from './AnswerList.jsx';
import PropTypes from 'prop-types';

const Question = ({ question, onShowMoreAnswersClick }) => {

  const onMoreAnswersClick = () => {
    onShowMoreAnswersClick(question.question_id);
  }

  let answers;
  let loadMoreAnswersDisplayed = false;

  if (question.showAll || Object.keys(question.answers).length <= 2) {
    answers = question.answers;
  } else if (Object.keys(question.answers).length > 2) {
    answers = Object.fromEntries(
      Object.entries(question.answers).slice(0, 2)
    );
    loadMoreAnswersDisplayed = true;
  }

  return (
    <div className="question">
      <p>Q: {question.question_body}</p>
      <AnswerList answers={answers}/>
      {loadMoreAnswersDisplayed && <p onClick={onMoreAnswersClick}>LOAD MORE ANSWERS</p>}
    </div>
  )
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  onShowMoreAnswersClick: PropTypes.func.isRequired
};

export default Question;