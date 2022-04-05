import React from 'react';
import AnswerList from './AnswerList.jsx';

const Question = (props) => {
  console.log('props1: ', props);
  return (
    <div className="question">
      <p>Q: {props.question.question_body}</p>
      <AnswerList answers={props.question.answers}/>
    </div>
  )
};

export default Question;