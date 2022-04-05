import React from 'react';
import Answer from './Answer.jsx';
import PropTypes from 'prop-types';

const AnswerList = ({ answers }) => {
  return (
    <div className="answer-list">
      {Object.values(answers).map(answer => {
        return <Answer answer={answer} key={answer.id}/>
      })}

    </div>
  )
};

AnswerList.propTypes = {
  answers: PropTypes.object.isRequired
};

export default AnswerList;