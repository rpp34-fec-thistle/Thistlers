import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ onShowMoreQuestionsClick, moreQuestions }) => {
  return (
    <div className="question-footer">
      {moreQuestions && <button onClick={onShowMoreQuestionsClick} className="more-questions-btn">MORE ANSWERED QUESTIONS</button>}
      <button className="add-question-btn">ADD A QUESTION +</button>
    </div>
  )
};

Footer.propTypes = {
  onShowMoreQuestionsClick: PropTypes.func.isRequired,
  moreQuestions: PropTypes.bool.isRequired
}

export default Footer;