import React from 'react';
import Answer from './Answer.jsx';
import PropTypes from 'prop-types';

const AnswerList = ({ answers, onHelpfulClick }) => {
  return (
    <div className="answer-list">
      {Object.values(answers).map(answer => {
        return <Answer answer={answer} key={answer.id} onHelpfulClick={onHelpfulClick}/>
      })}

    </div>
  )
};

AnswerList.propTypes = {
  answers: PropTypes.object.isRequired,
  onHelpfulClick: PropTypes.func.isRequired
};

export default AnswerList;