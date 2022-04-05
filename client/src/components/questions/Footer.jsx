import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ onShowMoreQuestionsClick }) => {
  return (
    <div className="question-footer">
      <button onClick={onShowMoreQuestionsClick} className="more-questions-btn">MORE ANSWERED QUESTIONS</button>
      <button className="add-question-btn">ADD A QUESTION +</button>
    </div>
  )
};

Footer.propTypes = {
  onShowMoreQuestionsClick: PropTypes.func.isRequired
}

export default Footer;