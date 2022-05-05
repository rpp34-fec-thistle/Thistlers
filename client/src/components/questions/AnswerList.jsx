import React from 'react';
import Answer from './Answer.jsx';
import PropTypes from 'prop-types';

const AnswerList = ({ answers, onHelpfulClick, onReport, reportedAnswers, onImageClick, currentImage }) => {

  const onImageClose = () => {
    document.querySelector('.display-image-modal').style.display = 'none';
    onImageClick(null, true);

  }

  return (
    <div>
      <div className="answer-list">
      {answers.map(answer => {
        const answerValues = Object.values(answer)[0];
        if (answerValues) {
          return (
            <Answer
              answer={answerValues}
              key={answerValues.id}
              onHelpfulClick={onHelpfulClick}
              onReport={onReport}
              reportedAnswers={reportedAnswers}
              onImageClick={onImageClick}
            />)
        }
      })}
      </div>
      <div className="display-image-modal">
        <div className="close-image-container">
          <p> </p>
          <div className="close-image-contents">
            <p onClick={onImageClose} className="close-modal">X</p>
          </div>
        </div>
        <img className="selected-image" src={currentImage}></img>
      </div>
    </div>

  )
};

AnswerList.propTypes = {
  answers: PropTypes.array.isRequired,
  onHelpfulClick: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  reportedAnswers: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
  currentImage: PropTypes.string.isRequired
};

export default AnswerList;