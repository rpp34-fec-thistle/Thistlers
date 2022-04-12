import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Question from './Question.jsx';

const testQuestionOne = {
  "question_id": 563784,
  "question_body": "Does this product run big or small?",
  "question_date": "2018-11-17T00:00:00.000Z",
  "asker_name": "iluvcatz",
  "question_helpfulness": 220,
  "reported": false,
  "answers": {
      "5269989": {
          "id": 5269989,
          "body": "It fit fine for me",
          "date": "2018-01-17T00:00:00.000Z",
          "answerer_name": "iluvbirds",
          "helpfulness": 5,
          "photos": []
      },
      "5269990": {
          "id": 5269990,
          "body": "Felt a little smaller than my usual size.",
          "date": "2018-12-17T00:00:00.000Z",
          "answerer_name": "iluvbirds",
          "helpfulness": 6,
          "photos": []
      }
  }
};

const testQuestionTwo = {
  "question_id": 563784,
  "question_body": "Does this product run big or small?",
  "question_date": "2018-11-17T00:00:00.000Z",
  "asker_name": "iluvcatz",
  "question_helpfulness": 220,
  "reported": false,
  "answers": {
      "5269989": {
          "id": 5269989,
          "body": "It fit fine for me",
          "date": "2018-01-17T00:00:00.000Z",
          "answerer_name": "iluvbirds",
          "helpfulness": 5,
          "photos": []
      },
      "5269990": {
          "id": 5269990,
          "body": "Felt a little smaller than my usual size.",
          "date": "2018-12-17T00:00:00.000Z",
          "answerer_name": "iluvbirds",
          "helpfulness": 6,
          "photos": []
      },
      "5269991": {
        "id": 5269991,
        "body": "Like Tom Hanks after talking to a fortune teller machine.",
        "date": "2018-14-17T00:00:00.000Z",
        "answerer_name": "iliketurtles",
        "helpfulness": 26,
        "photos": []
    }
  }
};

const onShowMoreQuestionsClick = () => {
  console.log('show more questions clicked');
}

const onCollapseAnswersClick = () => {
  console.log('show le questions clicked');
}

const onHelpfulClick = () => {
  console.log('helpful clicked');
}

const onReport = () => {
  console.log('report clicked');
}

describe('Question Component Unit Tests', () => {
  it('renders the question helpfulness number passed in props', () => {
    const {getByText} = render(
      <Question
        question={testQuestionOne}
        onShowMoreAnswersClick={onShowMoreQuestionsClick}
        onCollapseAnswersClick={onCollapseAnswersClick}
        allAnswersDisplayed={[]}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={[]}
      />
    );
    expect(getByText(/\(220\)/)).toBeInTheDocument();
  })

  it('renders and Add Answer button', () => {
    const {getByText} = render(
      <Question
        question={testQuestionOne}
        onShowMoreAnswersClick={onShowMoreQuestionsClick}
        onCollapseAnswersClick={onCollapseAnswersClick}
        allAnswersDisplayed={[]}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={[]}
      />
    );
    expect(getByText(/Add Answer/)).toBeInTheDocument();
  })

  it('does not render a LOAD MORE ANSWERS or COLLAPSE ANSWERS buttons if there are less than 3 answers', () => {
    const {queryByText} = render(
      <Question
        question={testQuestionOne}
        onShowMoreAnswersClick={onShowMoreQuestionsClick}
        onCollapseAnswersClick={onCollapseAnswersClick}
        allAnswersDisplayed={[]}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={[]}
      />
    );
    expect(queryByText(/LOAD MORE ANSWERS/)).not.toBeInTheDocument();
    expect(queryByText(/COLLAPSE ANSWERS/)).not.toBeInTheDocument();
  })

  it('renders a LOAD MORE ANSWERS button if there are more than 2 answers', () => {
    const {queryByText} = render(
      <Question
        question={testQuestionTwo}
        onShowMoreAnswersClick={onShowMoreQuestionsClick}
        onCollapseAnswersClick={onCollapseAnswersClick}
        allAnswersDisplayed={[]}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={[]}
      />
    );
    expect(queryByText(/LOAD MORE ANSWERS/)).toBeInTheDocument();
  })

  it('renders a COLLAPSE ANSWERS button if the answers are marked as expanded', () => {
    const {queryByText} = render(
      <Question
        question={testQuestionTwo}
        onShowMoreAnswersClick={onShowMoreQuestionsClick}
        onCollapseAnswersClick={onCollapseAnswersClick}
        allAnswersDisplayed={[563784]}
        onHelpfulClick={onHelpfulClick}
        onReport={onReport}
        reportedAnswers={[]}
      />
    );
    expect(queryByText(/COLLAPSE ANSWERS/)).toBeInTheDocument();
  })
})