import React from 'react';
import Answer from './Answer.jsx';
import PropTypes from 'prop-types';

const AnswerList = ({ answers, onHelpfulClick, onReport, reportedAnswers }) => {
  return (
    <div className="answer-list">
      {answers.map(answer => {
        const answerValues = Object.values(answer)[0];
        if (answerValues) {
          return <Answer answer={answerValues} key={answerValues.id} onHelpfulClick={onHelpfulClick} onReport={onReport} reportedAnswers={reportedAnswers}/>
        }
      })}
    </div>
  )
};

AnswerList.propTypes = {
  answers: PropTypes.array.isRequired,
  onHelpfulClick: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  reportedAnswers: PropTypes.array.isRequired
};

export default AnswerList;