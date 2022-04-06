import React from 'react';
import PropTypes from 'prop-types';

const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const Answer = ({ answer, onHelpfulClick }) => {

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${months[newDate.getMonth()]} ${newDate.getDay()}, ${newDate.getFullYear()}`;
  }

  const onAnswerLike = () => {
    onHelpfulClick('answers', answer.id);
  }

  return (
    <div className="answer">
      <p>{answer.body}</p>
        <div className="reaction-buttons">
          <p>by {answer.answerer_name}, {formatDate(answer.date)}</p>
          <p className="reaction-button-break">|</p>
          <p> Helpful? <span onClick={onAnswerLike}>Yes ({answer.helpfulness})</span></p>
          <p className="reaction-button-break">|</p>
          <p> Report</p>
        </div>
    </div>
  )
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  onHelpfulClick: PropTypes.func.isRequired
};

export default Answer;