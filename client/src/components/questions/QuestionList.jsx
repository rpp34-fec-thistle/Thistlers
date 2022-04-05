import React from 'react';
import Question from './Question.jsx';

const QuestionList = (props) => {
  return (
    <div className="question-list">
      {props.questions.map(question => {
        return <Question question={question} key={question.question_id}/>;
      })}
    </div>
  )
};

export default QuestionList;