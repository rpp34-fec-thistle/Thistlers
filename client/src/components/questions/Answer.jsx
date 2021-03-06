import React from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers.js';

const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const Answer = ({ answer, onHelpfulClick, onReport, reportedAnswers, onImageClick }) => {

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
  }

  const onAnswerLike = () => {
    if (helpers.checkLocalStorage('Answers', answer.id)) {
      return;
    } else {
      helpers.addToLocalStorage('Answers', answer.id);
      onHelpfulClick('answers', answer.id);
    }
  }

  const onAnswerReport = (e) => {
    e.currentTarget.classList.add('disabled');
    e.target.innerHTML = 'Reported';
    onReport('answers', answer.id);
  }

  const onPhotoClick = (e) => {
    onImageClick(e.target.src);
    document.querySelector('.display-image-modal').style.display = 'flex';
  }

  return (
    <div className="answer">
      <p>{answer.body}</p>
        {answer.photos.length > 0 && <div className="answer-images">{answer.photos.map((photoUrl, index) => <img onClick={onPhotoClick} className="answer-image" src={photoUrl} key={index}/>)}</div>}
        <div className="reaction-buttons">
          <p>by {answer.answerer_name === 'Seller'
            ? <span className="answer-from-seller">{answer.answerer_name}</span>
            : <span>{answer.answerer_name}</span>}, {formatDate(answer.date)}</p>
          <p className="reaction-button-break">|</p>
          <p> Helpful? <span className="helpful-button" onClick={onAnswerLike}>Yes</span> ({answer.helpfulness})</p>
          <p className="reaction-button-break">|</p>
          <p
            className={reportedAnswers.includes(answer.id) ? "reported-text" : "report-button"}
            onClick={onAnswerReport}>
            {reportedAnswers.includes(answer.id) ? <span className="reported-text">Reported</span> : <span>Report</span>}
          </p>
        </div>
    </div>
  )
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  onHelpfulClick: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  reportedAnswers: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired
};

export default Answer;