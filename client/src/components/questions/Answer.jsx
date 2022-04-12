import React from 'react';
import PropTypes from 'prop-types';

const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const Answer = ({ answer, onHelpfulClick, onReport, reportedAnswers }) => {

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
  }

  const onAnswerLike = () => {
    onHelpfulClick('answers', answer.id);
  }

  const onAnswerReport = () => {
    onReport('answers', answer.id);
  }

  return (
    <div className="answer">
      <p>{answer.body}</p>
        <div className="reaction-buttons">
          <p>by {answer.answerer_name}, {formatDate(answer.date)}</p>
          <p className="reaction-button-break">|</p>
          <p> Helpful? <span className="helpful-button" onClick={onAnswerLike}>Yes</span> ({answer.helpfulness})</p>
          <p className="reaction-button-break">|</p>
          <p onClick={onAnswerReport}> {reportedAnswers.includes(answer.id) ? <span className="reported-text">Reported</span> : <span>Report</span>}</p>
        </div>
    </div>
  )
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  onHelpfulClick: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  reportedAnswers: PropTypes.array.isRequired
};

export default Answer;