import React from 'react';

const Answer = (props) => {
  console.log(props.answer);
  return (
    <div className="answer">
      <p>A: {props.answer.body}</p>
        <div className="answer-footer">
          <p>by {props.answer.answerer_name}, {props.answer.date}</p>
          <p> | </p>
          <p> Helpful? <span>Yes ({props.answer.helpfulness})</span></p>
          <p> | </p>
          <p> Report</p>
        </div>
    </div>
  )
};

export default Answer;