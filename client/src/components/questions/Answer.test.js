/* eslint-disable no-undef */
import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Answer from './Answer.jsx';

const answer = {
  "id": 5270005,
  "body": "Yes it does",
  "date": "2019-11-24T00:00:00.000Z",
  "answerer_name": "n00bgamer",
  "helpfulness": 4,
  "photos": ['https://i.ibb.co/4pn5TwC/bowl.jpg']
}

const onHelpfulClick = () => {
  console.log('helpful click!');
}

const onReport = () => {
  console.log('Report click!');
}

const onImageClick = () => {
  console.log('image click!');
}

const reportedAnswers = [];

describe('Answer Component Unit Tests', () => {
  it('renders the Report button', () => {
    const {getByText} = render(
      <Answer
        answer={answer}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={reportedAnswers}
        onImageClick={onImageClick}
      />
    );
    expect(getByText('Report')).toBeInTheDocument();
  })

  it('renders the answer helpfulness number passed in props', () => {
    const {getByText} = render(
      <Answer
        answer={answer}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={reportedAnswers}
        onImageClick={onImageClick}
      />
    );
    expect(getByText(/\(4\)/)).toBeInTheDocument();
  })

  it('renders the author and date of a question', () => {
    const {getByText} = render(
      <Answer
        answer={answer}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={reportedAnswers}
        onImageClick={onImageClick}
      />
    );
    expect(getByText(/n00bgamer/)).toBeInTheDocument();
    expect(getByText(/ November 23, 2019/)).toBeInTheDocument();
  })

  it('renders the question body', () => {
    const {getByText} = render(
      <Answer
        answer={answer}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={reportedAnswers}
        onImageClick={onImageClick}
      />
    );
    expect(getByText(/Yes it does/)).toBeInTheDocument();
  })
})



// describe('Answer Component Integration Tests', () => {
//   it('adds an answer', () => {

//   })

//   it('renders "Reported" when the "Report" button is clicked', () => {

//   })
// })