import React from 'react';
import Answer from './Answer.jsx';

const AnswerList = (props) => {
  console.log('props: ', props);
  return (
    <div className="answer-list">
      {Object.values(props.answers).map(answer => {
        return <Answer answer={answer} />
      })}

    </div>
  )
};

export default AnswerList;