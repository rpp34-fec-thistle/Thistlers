import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer }) => {
  return (
    <div className="answer">
      <p>A: {answer.body}</p>
        <div className="answer-footer">
          <p>by {answer.answerer_name}, {answer.date}</p>
          <p> | </p>
          <p> Helpful? <span>Yes ({answer.helpfulness})</span></p>
          <p> | </p>
          <p> Report</p>
        </div>
    </div>
  )
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired
};

export default Answer;